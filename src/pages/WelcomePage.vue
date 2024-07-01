<script setup>
import { usePersonStore } from '../stores/PersonStore'
import Typography from '../shared/Typography.vue'
import { router } from '../router'

const personStore = usePersonStore()

setTimeout(() => router.push('/all/products'), 3000)
</script>

<template>
    <Typography tag-name="h1">Добро пожаловать, {{ personStore.getCurrentPerson.name }}</Typography>
    <Typography>Перенаправление на страницу категорий через 3 секунд...</Typography>
</template>

<style lang="scss" scoped></style>
