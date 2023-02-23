<template>
    <div class="header ">
        <div class="header-logo">
            <img :src="logo" alt="Logo" />
        </div>
         <a :href="gitHubUrl" target="_blank">Github</a>
    </div>
    <div>
        <div class="hero">
            <div class="hero-info">
                <div class="hero-info-content">
                    <h1>Aqui você ganha segurança e transparência.</h1>
                    <p>
                        Escolha em nossa plataforma mais de 100 Criptomoedas, com negociações atualizadas em minutos, <strong>só para você</strong>.
                    </p>
                </div>
            </div>
            <div class="hero-image">
                <div class="hero-image-content">
                    <img :src="svgFinance" alt="Finance">
                </div>
            </div>
        </div>
        <crypto-list></crypto-list>
    </div>
    <div class="footer">
     <span>Projetado e codificado por Charlly Garcia<strong> ©Copyright 2022</strong></span>
    </div>
</template>
<script setup>
import CryptoList from '../components/CryptoList/CryptoList.vue'
import  logo  from '../assets/img/logo.svg'
import svgFinance from '../assets/img/svg-bitcoin.svg'

const gitHubUrl = import.meta.env.VITE_APP_GITHUB_URL
</script>
<style lang="scss" scoped>
@import './CryptoPage-style.scss';
</style>