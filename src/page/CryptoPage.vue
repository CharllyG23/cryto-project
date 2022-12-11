<template>
    <div>
        <div class="header">
            <a href="#default" class="logo">Logo</a>
        </div>
        <crypto-list></crypto-list>
    </div>
</template>
<script setup>
import CryptoList from '../components/CryptoList/CryptoList.vue'
</script>
<style lang="scss" scoped>
.header {
    @apply bg-gray-200 py-5 px-16;

    .logo{
        @apply font-bold text-2xl text-slate-900;
    }
}
</style>