<template>
    <div class="crytoList">
        <crypto-ticker :coin="currentCoin"></crypto-ticker>
       <div class="crytoList-filters">
           <div class="crytoList-filters--inputs">
                <div>
                    <crypto-input
                        v-model="fromDate"
                        label="Data de Inicio"
                        :type="'date'"
                    />
                </div>
                <div>
                    <crypto-input
                        v-model="toDate"
                        label="To"
                        :type="'date'"
                    />
                </div>
                <div class="crytoList-filters--button ">
                    <button class="btn" @click="doSearch">Buscar</button>
                </div>
           </div>
            <crypto-filters :coin="currentCoin" @filter-seleted="filter" />
       </div>
        <div class="crytoList-container">
            <h1>Negociações em {{ currentCoin.name }}.</h1>
            <div class="crytoList-container-content">
                <div v-if="loading" class="crytoList-container-content-items">
                    <crypto-list-skeleton v-for="i in perPage" :key="i" />
                </div>
                <div v-else class="crytoList-container-content-items">
                    <crypto-item v-for="(item, index) in itemsList" :key="index" :data="item" :coin="currentCoin"/>
                </div>
            </div>
            <div v-if="crypto.length === 0">
                Nenhum resultado para <strong>{{ currentCoin.name }}!</strong>
            </div>
            <div class="crytoList-container-button">
                <button v-if="page < totalPages" type="button" @click="onSeeMore">Ver mais</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from '@vue/runtime-core';
import CryptoInput from '../CryptoInput/CryptoInput.vue';
import CryptoItem from '../CryptoItem/CryptoItem.vue'
import CryptoListSkeleton from '../CryptoListSkeleton/CryptoListSkeleton.vue';
import  api from '../../support/http/api.js'
import { TRADE_COINS } from '../../support/utils/coins.js'
import { parseToUnix } from '../../support/utils/date-formats'
import CryptoFilters from '../CryptoFilters/CryptoFilters.vue';
import CryptoTicker from '../CryptoTicker/CryptoTicker.vue';

const crypto = ref([])
const loading = ref(true)
const page = ref(1)
const perPage = 20

// Page filters
const currentCoin = ref(TRADE_COINS[0])
const fromDate = ref(null)
const toDate = ref(null)

const validationError = computed(() => {
    const bothAreNull = fromDate.value == null && toDate.value === null
    const bothAreDates = fromDate.value instanceof Date && toDate.value instanceof Date
    const oneIsDate = fromDate.value instanceof Date || toDate.value instanceof Date

    if (bothAreNull) { return null}

    if(oneIsDate && !bothAreDates) {
        return 'ambas datas tem que ser setadas.'    
    }

    if (bothAreDates && fromDate.value > toDate.value) {
        return 'from date não pode ser maior que to date.'
    }

    return null
})

const totalPages = computed(() => Math.ceil(crypto.value.length / perPage))
const itemsList = computed(() => crypto.value.slice(0, end.value))

const end = computed(() => {
    let end = page.value * perPage
    if(end.valueOf > crypto.value.length){
        return crypto.value.length
    } 
    return end;
})

const onSeeMore = () => page.value +=1;

// Request
const fetchCryptocurrency = async ({ coinKey, from = null, to = null }) => {
    const getTrades = `/:coin/trades`
    const getTradesFilterFromTo = `/:coin/trades/:from/:to`
    if (!coinKey) {
        throw new Error('Invalid currency...')
    }

    let url = getTrades

    if(from && to) {
        url = getTradesFilterFromTo
        url = url.replace(':from', parseToUnix(from)).replace(':to', parseToUnix(to))
    }
    url = url.replace(':coin', coinKey)

    loading.value = true;

    try {
        const response = await api.get(url);
        crypto.value = response.data
        crypto.value = crypto.value.sort((a, b) => {
        if(a.date > b.date) return  -1
        if(a.date < b.date) return 1
        if(a.date === b.date) return 0
    })
    } catch (error) {
        console.error(error);
    }

	loading.value = false;
}

const filter = (value) => {
    currentCoin.value = value
    fetchCryptocurrency({ coinKey: value.key })
}


const doSearch = () => {
    if (loading.value || !canSearch.value) return
    page.value = 1
    fetchCryptocurrency({
        coinKey: currentCoin.value.key, 
        from: fromDate.value,
        to: toDate.value
    })
}

onMounted(() =>{
    fetchCryptocurrency({ coinKey: currentCoin.value.key })
})
</script>
<style lang="scss" scoped>
@import './CryptoList-style.scss';
</style>