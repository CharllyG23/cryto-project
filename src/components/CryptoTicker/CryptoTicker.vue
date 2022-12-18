<template>
    <div class="cryptoTicker">
        <div class="cryptoTicker__cards " v-for="(card, i) in  formatTicker" :key="i" >
           <div v-if="!loadingCards" class="cryptoTicker__cards--content">
                <h1 class="pb-4 text-slate-500 font-normal">{{ card.title }}</h1>
                <div class="cryptoTicker__cards--header">
                    <div v-html="card.svg "></div>
                    <p>{{formatValueToShow(card.currentValue) }}</p>
                </div>
           </div>
            <div v-else class="flex justify-center items-center">
                <crypto-spinner/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { TRADE_COINS } from '../../support/utils/coins.js'
import { api } from '../../support/http/api.js'
import { formatValueToShow } from '../../support/utils/currency-conversion'
import CryptoSpinner from '../CryptoSpinner/CryptoSpinner.vue';

const props = defineProps({
    ticker: {
        type: Object,
        default: {},
    },

    loadingCards: {
        type: Boolean,
        default: false,
    }
})


const tickerText = computed (() => {
    let priceMax, priceLow, volumMax, currentValue = '0.00'
    if(props.ticker && props.ticker?.ticker) {
        const { low, high, last, vol } = props.ticker.ticker
        priceMax = high
        priceLow = low
        volumMax = vol
        currentValue = last
    }

    return { priceMax, priceLow, volumMax, currentValue }
})

const formatTicker = computed (() => {
    const data = [
        {
            title: 'Reais',
            svg: `<svg width="30" height="30" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.03538 25.75C6.63399 25.75 6.2973 25.614 6.0253 25.342C5.75424 25.0709 5.61871 24.7347 5.61871 24.3333V22.7042C4.55621 22.4681 3.62358 22.0549 2.8208 21.4646C2.01802 20.8743 1.36871 20.0479 0.872881 18.9854C0.707603 18.6549 0.701464 18.3068 0.854464 17.9413C1.00841 17.5749 1.28607 17.309 1.68746 17.1437C2.01802 17.0021 2.36038 17.0082 2.71455 17.1622C3.06871 17.3152 3.34024 17.5688 3.52913 17.9229C3.93052 18.6313 4.43816 19.1686 5.05205 19.5351C5.66594 19.9006 6.42149 20.0833 7.31871 20.0833C8.28677 20.0833 9.10749 19.8652 9.78088 19.4288C10.4533 18.9916 10.7895 18.3125 10.7895 17.3917C10.7895 16.5653 10.5298 15.9098 10.0104 15.4253C9.49094 14.9418 8.28677 14.3931 6.39788 13.7792C4.36732 13.1417 2.97427 12.3804 2.21871 11.4955C1.46316 10.6096 1.08538 9.52917 1.08538 8.25417C1.08538 6.71944 1.58121 5.52708 2.57288 4.67708C3.56455 3.82708 4.57982 3.34306 5.61871 3.225V1.66667C5.61871 1.26528 5.75424 0.928583 6.0253 0.656583C6.2973 0.385528 6.63399 0.25 7.03538 0.25C7.43677 0.25 7.77346 0.385528 8.04546 0.656583C8.31652 0.928583 8.45205 1.26528 8.45205 1.66667V3.225C9.34927 3.36667 10.1284 3.65614 10.7895 4.09342C11.4507 4.52975 11.9937 5.06667 12.4187 5.70417C12.6312 6.01111 12.6728 6.35347 12.5434 6.73125C12.413 7.10903 12.1472 7.38055 11.7458 7.54583C11.4152 7.6875 11.0729 7.69317 10.7187 7.56283C10.3645 7.43344 10.034 7.20347 9.72705 6.87292C9.4201 6.54236 9.06027 6.28831 8.64755 6.11075C8.23388 5.93414 7.7201 5.84583 7.10621 5.84583C6.06732 5.84583 5.27635 6.07628 4.7333 6.53717C4.19024 6.99711 3.91871 7.56944 3.91871 8.25417C3.91871 9.03333 4.27288 9.64722 4.98121 10.0958C5.68955 10.5444 6.91732 11.0167 8.66455 11.5125C10.2937 11.9847 11.5276 12.7341 12.3663 13.7607C13.204 14.7883 13.6229 15.975 13.6229 17.3208C13.6229 18.9972 13.127 20.2722 12.1354 21.1458C11.1437 22.0194 9.91593 22.5625 8.45205 22.775V24.3333C8.45205 24.7347 8.31652 25.0709 8.04546 25.342C7.77346 25.614 7.43677 25.75 7.03538 25.75V25.75Z" fill="#EBAE12"/></svg>`,
            currentValue: tickerText.value.currentValue
        },
        {
            title: 'Máxima',
            svg: `<svg width="22"  height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.4167 20.9166V5.09247L19.33 12.0058C19.8825 12.5583 20.7892 12.5583 21.3417 12.0058C21.473 11.8747 21.5772 11.7191 21.6483 11.5477C21.7194 11.3763 21.756 11.1926 21.756 11.0071C21.756 10.8215 21.7194 10.6378 21.6483 10.4664C21.5772 10.295 21.473 10.1394 21.3417 10.0083L12.0058 0.672475C11.8748 0.541145 11.7191 0.436952 11.5477 0.365862C11.3763 0.294771 11.1926 0.258179 11.0071 0.258179C10.8215 0.258179 10.6378 0.294771 10.4664 0.365862C10.2951 0.436952 10.1394 0.541145 10.0083 0.672475L0.658324 9.99414C0.527167 10.1253 0.423127 10.281 0.352145 10.4524C0.281163 10.6237 0.244629 10.8074 0.244629 10.9929C0.244629 11.1784 0.281163 11.362 0.352145 11.5334C0.423127 11.7048 0.527167 11.8605 0.658324 11.9916C0.789482 12.1228 0.945189 12.2268 1.11655 12.2978C1.28792 12.3688 1.47159 12.4053 1.65708 12.4053C1.84256 12.4053 2.02623 12.3688 2.19759 12.2978C2.36896 12.2268 2.52467 12.1228 2.65582 11.9916L9.58333 5.09247V20.9166C9.58333 21.6958 10.2208 22.3333 11 22.3333C11.7792 22.3333 12.4167 21.6958 12.4167 20.9166Z" fill="#22C532"/></svg>`,
            currentValue: tickerText.value.priceMax
        },
        {
            title: 'Mínima',
            svg: `<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.58344 2.08329V17.9075L2.6701 10.9941C2.1176 10.4416 1.21094 10.4416 0.658436 10.9941C0.527106 11.1252 0.422914 11.2809 0.351823 11.4522C0.280733 11.6236 0.244141 11.8073 0.244141 11.9929C0.244141 12.1784 0.280733 12.3621 0.351823 12.5335C0.422914 12.7049 0.527106 12.8606 0.658436 12.9916L9.99427 22.3275C10.5468 22.88 11.4393 22.88 11.9918 22.3275L21.3276 12.9916C21.4588 12.8605 21.5628 12.7048 21.6338 12.5334C21.7048 12.362 21.7413 12.1784 21.7413 11.9929C21.7413 11.8074 21.7048 11.6237 21.6338 11.4524C21.5628 11.281 21.4588 11.1253 21.3276 10.9941C21.1964 10.863 21.0407 10.7589 20.8694 10.6879C20.698 10.617 20.5143 10.5804 20.3289 10.5804C20.1434 10.5804 19.9597 10.617 19.7883 10.6879C19.617 10.7589 19.4613 10.863 19.3301 10.9941L12.4168 17.9075V2.08329C12.4168 1.30413 11.7793 0.666626 11.0001 0.666626C10.2209 0.666626 9.58344 1.30413 9.58344 2.08329Z" fill="#BC2121"/></svg>`,
            currentValue: tickerText.value.priceLow
        },
        {
            title: 'Volume',
            svg: `<svg width="28" height="28" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2915 3.375H29.4582" stroke="#2C61E9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5415 8.33329L8.20817 2.66663" stroke="#2C61E9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.20801 2.66663V26.75" stroke="#2C61E9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.2915 10.4583H26.6248" stroke="#2C61E9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.2915 17.5416H23.7915" stroke="#2C61E9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.2915 24.625H20.9582" stroke="#2C61E9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            currentValue: tickerText.value.volumMax
        },
    ]
    return data
}) 

</script>
<style lang="scss" scoped>
@import './CryptoTicker-style.scss';
</style>