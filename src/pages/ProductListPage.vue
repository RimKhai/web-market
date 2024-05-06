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

    const $product_store = useProductStore()
    const $category_store = useCategoryStore()
    const $route = useRoute()

    const _current_page = ref(1)
    const ITEMS_PER_PAGE = 3

    const _count_of_items = computed(() =>
        $route.params.category.at(-1) == 'all'
            ? $product_store.products.length
            : $category_store.getAllByPath($route.params.category.at(-1))[0]
                  .products.length
    )

    const _displayed_items = computed(() => {
        const startIndex = (_current_page.value - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE

        if ($route.params.category.at(-1) == 'all') {
            return $product_store.products.slice(startIndex, endIndex)
        }

        return $category_store
            .getAllByPath($route.params.category.at(-1))[0]
            .products.reduce((accum, item) => {
                return [...accum, $product_store.getProductById(item)]
            }, [])
            .slice(startIndex, endIndex)
    })

    const changePage = (page_number) => {
        _current_page.value = page_number
    }

    const cardVisibility = (product_id) => {
        return (
            $category_store
                .getCategoryByPath($route.params.category.at(-1))
                ?.products?.includes(product_id) ||
            $route.params.category == 'all'
        )
    }

    const SORT_OPTIONS = [
        {
            title: 'Без Сортировки',
            value: 'byId',
        },
        {
            title: 'По Алфавиту',
            value: 'alphabetical',
        },
        {
            title: 'По Цене(Сначала низкие)',
            value: 'priceLow',
        },
        {
            title: 'По Цене(Сначала высокие)',
            value: 'priceHigh',
        },
        {
            title: 'По Рейтингу',
            value: 'rating',
        },
    ]
</script>

<template>
    <div class="flex w-full">
        <aside class="w-[25%] category-menu">
            <Dropdown class="category-menu__list">
                <template #button>
                    <Typography
                        tag_name="p"
                        class="category-menu__button"
                        >Категория</Typography
                    >
                </template>
                <template #panel>
                    <div class="category-menu__content">
                        <NestedListItem
                            :item="item"
                            :index="index"
                            v-for="(
                                item, index
                            ) in $category_store.categoriesTree"
                            :key="item.id" />
                    </div>
                </template>
            </Dropdown>
        </aside>
        <main class="product-list">
            <LineNavigation />
            <div class="product-list__actions">
                <BaseSelect
                    @onClick="(data) => $product_store.sortBy(data.value)"
                    :data="SORT_OPTIONS" />
            </div>
            <Pagination
                class="space-y-2"
                :items_count="_count_of_items"
                :items_per_page="ITEMS_PER_PAGE"
                :current_age="_current_page"
                @changePage="changePage">
                <div
                    v-for="product in _displayed_items"
                    :key="product.id">
                    <ProductCard
                        v-show="cardVisibility(product.id)"
                        :id="product.id"
                        :name="product.name"
                        :description="product.description"
                        :quantity="product.quantity"
                        :price="product.price"
                        :image_name="product.image_name" />
                </div>
            </Pagination>
        </main>
        <aside class="w-[25%]"></aside>
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
