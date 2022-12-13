<template>
    <div class="crytoList">
        <crypto-ticker :ticker="ticker"></crypto-ticker>
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
                        label="Data Final"
                        :type="'date'"
                    />
                </div>
                <div class="crytoList-filters--button ">
                    <button class="btn" @click="doSearch">Busca</button>
                </div>
           </div>
            <div class="crytoList-filters--select">
                <crypto-filters :coin="currentCoin" @filter-seleted="filter" />
            </div>
       </div>
       <span class=" px-20 text-sm text-red-400 font-medium">{{ validationError }}</span>
        <div class="crytoList-container">
            <h1>Lista de Negociação de {{ currentCoin.name }}.</h1>
             <div class="crytoList-container-content">
                <div v-if="loading"  class="crytoList-container-content">
                    <crypto-list-skeleton  />
                </div>
                <div v-if="loading && crypto.length != 0" class="crytoList-container-content">
                    <crypto-table-header />
                    <div class="cryptoTableItem">
                        <crypto-table-item  v-for="(item, index) in itemsList" :key="index" :data="item" :coin="currentCoin" />
                    </div>
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
import { computed, onMounted, onUnmounted, ref } from '@vue/runtime-core';
import CryptoInput from '../CryptoInput/CryptoInput.vue';
import CryptoTableItem from '../CryptoTableItem/CryptoTableItem.vue'
import CryptoListSkeleton from '../CryptoListSkeleton/CryptoListSkeleton.vue';
import  api from '../../support/http/api.js'
import { TRADE_COINS } from '../../support/utils/coins.js'
import { parseToUnix } from '../../support/utils/date-formats'
import CryptoFilters from '../CryptoFilters/CryptoFilters.vue';
import CryptoTicker from '../CryptoTicker/CryptoTicker.vue';
import CryptoTableHeader from '../CryptoTableHeader/CryptoTableHeader.vue';
import { useInterval } from '../../composables/use-interval'

const crypto = ref([])
const loading = ref(true)
const page = ref(1)
const perPage = 5

// Page filters
const currentCoin = ref(TRADE_COINS[0])
const fromDate = ref(null)
const toDate = ref(null)

const canSearch = computed(()=> validationError.value === null)

const validationError = computed(() => {
    const bothAreNull = fromDate.value === null && toDate.value === null
    const bothAreDates = fromDate.value instanceof Date && toDate.value instanceof Date
    const oneIsDate = fromDate.value instanceof Date || toDate.value instanceof Date

    if (bothAreNull) { return null}

    if(oneIsDate && !oneIsDate) {
        return 'Ambas as datas devem ser preenchidas.'
    }

    if (bothAreDates && fromDate.value > toDate.value) {
        return 'A data inserida está incorreta para a data atual'
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
const ticker = ref({})

// Request
const fetchCryptocurrency = async ({ coinKey, from = null, to = null, loadingRequest = true }) => {
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

    if(loadingRequest)

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
    if(loadingRequest);
}

const fetchCryptoTicker =  async (coin) => {
    const getTicker = `/${coin.key}/ticker`
    try {
        const response = await api.get(getTicker);
        ticker.value = response.data

    } catch (error) {
        console.error(error);
    }
}

const filter = (value) => {
    currentCoin.value = value
    fetchCryptocurrency({ coinKey: value.key })
    fetchCryptoTicker(value)
}

const doSearch = () => {
    if (loading || !canSearch.value) return
    page.value = 1
    fetchCryptocurrency({
        coinKey: currentCoin.value.key, 
        from: fromDate.value,
        to: toDate.value
    })
}

const { start, stop } = useInterval(() => {
     
    fetchCryptocurrency({ coinKey: currentCoin.value.key, loadingRequest: true})
    fetchCryptoTicker(currentCoin.value)
})

onMounted(() =>{
    start(10000, true)
})

onUnmounted(() => {
    stop()
})

</script>
<style lang="scss" scoped>
@import './CryptoList-style.scss';
</style>