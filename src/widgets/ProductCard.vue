<script setup>
import { computed, ref } from 'vue'

import { useCartStore } from '../stores/CartStore'
import { useProductStore } from '../stores/ProductStore'
import { usePersonStore } from '../stores/PersonStore'
import { useRoute } from 'vue-router'

import Button from '../shared/Button.vue'
import Typography from '../shared/Typography.vue'

const $props = defineProps({
    id: {
        type: Number,
    },
    name: {
        type: String,
        default: 'Unnamed',
    },
    description: {
        type: String,
        default: 'No Description',
    },
    quantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        default: 109999,
    },
    image_name: {
        type: String,
        default: '',
    },
})

const $cart_store = useCartStore()
const $product_store = useProductStore()
const $person_store = usePersonStore()
const $route = useRoute()

const _img_src = ref()
const _person_id = computed(() => $person_store.logined_person_id)
const _product_link = computed(
    () => `/${$route.params.category}/product/${$props.id}`,
)
const _product = computed(() => $product_store.getProductById($props.id))

const onClick = id => {
    if (!$cart_store.isInCart(_person_id.value, id)) {
        $cart_store.addToCart(_person_id.value, id)
    }
}

import(`../assets/${$props.image_name}.png`).then(image_imports => {
    _img_src.value = image_imports.default
})
</script>

<template>
    <div class="product-card">
        <RouterLink :to="_product_link">
            <img
                class="product-card__image"
                :src="_img_src"
                alt="failed"
            />
        </RouterLink>
        <section class="product-card__container">
            <div class="product-card__description">
                <div class="flex items-center gap-2">
                    <RouterLink :to="_product_link">
                        <Typography tag_name="p">{{ name }}</Typography>
                    </RouterLink>
                    <Typography tag_name="p">
                        {{ _product.total_rating.toFixed(1) }}
                        <span class="star">★</span>
                    </Typography>
                </div>
                <Typography>{{ description }}</Typography>
            </div>
            <Typography class="product-card__quantity">{{
                quantity
            }}</Typography>
            <div class="product-card__actions">
                <Typography>{{ price }} Руб.</Typography>
                <div v-if="_person_id !== -1">
                    <Button
                        size="m"
                        color="primary"
                        v-if="!$cart_store.isInCart(_person_id, id)"
                        @click="onClick(id)"
                    >
                        В корзину
                    </Button>
                    <Button
                        size="m"
                        color="disabled"
                        v-else
                        @click="$cart_store.removeFromCart(_person_id, id)"
                    >
                        Убрать
                    </Button>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.product-card {
    display: flex;
    justify-content: space-between;
    gap: 0 12px;
    background-color: rgba($color: $primary-color, $alpha: 0.4);
    padding: 24px 36px;
    border-radius: 12px;
}

.product-card__container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.product-card__description {
    width: 40%;
}

.product-card__quantity {
    align-self: center;
    color: $pallete-success;
}

.product-card__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px 0px;
}

.product-card__image {
    width: 200px;
}

.star {
    color: $accent-color;
    font-size: 18px;
}
</style>
