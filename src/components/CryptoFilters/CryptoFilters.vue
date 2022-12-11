<template>
    <crypto-select 
        :options="TRADE_COINS" 
        :value-selected="coin" 
        @onSelected="filterSelected" 
        :label="'Selecione'"
    />
</template>
<script setup>
import CryptoSelect from '../CryptoSelect/CryptoSelect.vue';
import { TRADE_COINS } from '../../support/utils/coins.js'

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