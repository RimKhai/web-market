<script setup>
    import { usePersonStore } from '../stores/PersonStore'
    import Typography from '../shared/Typography.vue';
    import { router } from '../router'

    const $person_store = usePersonStore()

    setTimeout(() => router.push('/'), 3000)
</script>

<template>
    <Typography tag_name="h1">Добро пожаловать, {{ $person_store.getCurrentPerson.name }}</Typography>
    <Typography>Перенаправление на страницу категорий через 3 секунд...</Typography>
</template>

<style lang="scss" scoped></style>
