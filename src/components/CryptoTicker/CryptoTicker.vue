<template>
    <div class="mb-16">
        <div class="bg-gray-100 py-6">
            <span>{{ ticker }}</span>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { TRADE_COINS } from '../../support/utils/coins.js'
import  {api} from '../../support/http/api.js'

const props = defineProps({
    coin: {
        type: Object,
        default: {}
    }
})

const ticker = ref([])
const fetchCrytoTicker =  async (coin) => {
    const getTicker = `/${coin.key}/ticker`
    try {
        const response = await api.get(getTicker);
        ticker.value = response.data
        console.log('reponse', ticker)

    } catch (error) {
        console.error(error);
    }
}

onMounted(() =>{
    fetchCrytoTicker(props.coin)
})
</script>