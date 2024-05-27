<script setup>
import { useCategoryStore } from '../stores/CategoryStore'

import { RouterLink } from 'vue-router'
import Typography from '../shared/Typography.vue'

const categoryStore = useCategoryStore()
</script>

<template>
    <div class="flex">
        <RouterLink to="/all/products">
            <Typography> Категории </Typography>
        </RouterLink>
        <div
            v-for="(category, index) in $route.params.category"
            :key="category"
        >
            <RouterLink
                :to="'/' + $route.params.category.slice(0, index + 1).join('/') + '/products'"
            >
                {{ `/${categoryStore.getCategoryByPath(category).title.toLowerCase()}` }}
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
