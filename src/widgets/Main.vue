<script setup>
    import Header from './Header.vue'
    import { RouterView } from 'vue-router'
</script>

<template>
    <Header class="header"></Header>
    <main class="main">
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 40px;
        margin-top: 80px;
    }
</style>
