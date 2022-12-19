<template>
  <div class="crytoListSkeleton">
    <crypto-spinner :size="40" />
  </div>
</template>
<script setup>
import CryptoSpinner from '../CryptoSpinner/CryptoSpinner.vue';
</script>
  <style lang="scss" scoped>
  @import './CryptoListSkeleton-style.scss';
  </style>