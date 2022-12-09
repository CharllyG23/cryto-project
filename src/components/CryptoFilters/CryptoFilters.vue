<template>
    <div>
        <crypto-select 
            :options="TRADE_COINS" 
            :value-selected="coin" 
            @onSelected="filterSelected" 
        />
    </div>
</template>
<script setup>
import CryptoSelect from '../CryptoSelect/CryptoSelect.vue';
import { TRADE_COINS } from '../../support/utils/coins.js'
import { onBeforeUpdate, onMounted, onUpdated } from 'vue'

const emits = defineEmits(['filter-seleted'])

const props = defineProps({
    coin: {
        type: Object,
        default: {}
    }
})

const filterSelected = (value) => {
    emits('filter-seleted', value) 
}
</script>