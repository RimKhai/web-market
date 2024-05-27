<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useProductStore } from '../stores/ProductStore'
import { useCategoryStore } from '../stores/CategoryStore'

import ProductCard from '../widgets/ProductCard.vue'
import BaseSelect from '../features/BaseSelect.vue'
import NestedListItem from '../features/NestedListItem.vue'
import Dropdown from '../features/Drowdown.vue'
import Typography from '../shared/Typography.vue'
import LineNavigation from '../features/LineNavigation.vue'
import Pagination from '../features/Pagination.vue'

const productStore = useProductStore()
const categoryStore = useCategoryStore()
const route = useRoute()

const currentPage = ref(1)
const ITEMS_PER_PAGE = 3

const countOfItems = computed(() =>
    route.params.category.at(-1) == 'all'
        ? productStore.products.length
        : categoryStore.getAllByPath(route.params.category.at(-1))[0].products.length
)

const displayedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    if (route.params.category.at(-1) == 'all') {
        return productStore.products.slice(startIndex, endIndex)
    }

    return categoryStore
        .getAllByPath(route.params.category.at(-1))[0]
        .products.reduce((accum, item) => {
            return [...accum, productStore.getProductById(item)]
        }, [])
        .slice(startIndex, endIndex)
})

const changePage = (pageNumber) => {
    currentPage.value = pageNumber
}

const cardVisibility = (productId) => {
    return (
        categoryStore
            .getCategoryByPath(route.params.category.at(-1))
            ?.products?.includes(productId) || route.params.category == 'all'
    )
}

const SORT_OPTIONS = [
    {
        title: 'Без Сортировки',
        value: 'byId'
    },
    {
        title: 'По Алфавиту',
        value: 'alphabetical'
    },
    {
        title: 'По Цене(Сначала низкие)',
        value: 'priceLow'
    },
    {
        title: 'По Цене(Сначала высокие)',
        value: 'priceHigh'
    },
    {
        title: 'По Рейтингу',
        value: 'rating'
    }
]
</script>

<template>
    <div class="flex w-full">
        <aside class="w-[25%] category-menu">
            <Dropdown class="category-menu__list">
                <template #button>
                    <Typography
                        tag-name="p"
                        class="category-menu__button"
                        >Категория</Typography
                    >
                </template>
                <template #panel>
                    <div class="category-menu__content">
                        <NestedListItem
                            v-for="(item, index) in categoryStore.categoriesTree"
                            :key="item.id"
                            :item="item"
                            :index="index"
                        />
                    </div>
                </template>
            </Dropdown>
        </aside>
        <main class="product-list">
            <LineNavigation />
            <div class="product-list__actions">
                <BaseSelect
                    :data="SORT_OPTIONS"
                    @on-click="(data) => productStore.sortBy(data.value)"
                />
            </div>
            <Pagination
                class="space-y-2"
                :items-count="countOfItems"
                :items-per-page="ITEMS_PER_PAGE"
                :current-page="currentPage"
                @change-page="changePage"
            >
                <div
                    v-for="product in displayedItems"
                    :key="product.id"
                >
                    <ProductCard
                        v-show="cardVisibility(product.id)"
                        :id="product.id"
                        :name="product.name"
                        :description="product.description"
                        :quantity="product.quantity"
                        :price="product.price"
                        :image-name="product.imageName"
                    />
                </div>
            </Pagination>
        </main>
        <aside class="w-[25%]" />
    </div>
</template>

<style lang="scss" scoped>
.category-menu {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 40;
}

.category-menu__list {
    padding: 16px 24px;
    background-color: $primary-surface;
    border-radius: 16px;
    position: absolute;
    &.is_open_true {
        padding: 48px 24px;
    }
}

.category-menu__content {
    padding: 24px 8px;
    background-color: $primary-color;
    border-radius: 16px;
    margin-left: 32px;
}

.product-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 50%;
}

.product-list__actions {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 250px;
    width: 25%;
}
</style>
