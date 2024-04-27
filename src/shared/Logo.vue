<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { RouterLink } from 'vue-router'

    import Typography from './Typography.vue'
    import BaseIcon from './BaseIcon.vue'

    const _screen_width = ref(0)

    const onScreenResize = () => {
        window.addEventListener('resize', () => {
            updateScreenWidth()
        })
    }
    const updateScreenWidth = () => {
        _screen_width.value = window.innerWidth
    }

    onMounted(() => {
        onScreenResize()
        updateScreenWidth()
    })
</script>

<template>
    <RouterLink
        class="header__logo"
        to="/">
        <BaseIcon fill="none" type="globe" />
        <Typography
            tag_name="h4"
            bold
            >{{ _screen_width > 768 ? 'WEB MARKET' : 'WB' }}</Typography
        >
    </RouterLink>
</template>

<style scoped>
    .header__logo {
        display: flex;
        align-items: center;
        gap: 0 4px;
    }
</style>
