<template>
    <div>
        <cryto-select 
            :options="TRADE_COINS" 
            :value-selected="coin" 
            @onSelected="filterSelected" 
        />
    </div>
</template>
<script setup>
import CrytoSelect from '../CrytoSelect/CrytoSelect.vue';
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