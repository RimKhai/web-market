<script setup>
import { computed, ref } from 'vue'

import { useCartStore } from '../stores/CartStore'
import { useProductStore } from '../stores/ProductStore'
import { usePersonStore } from '../stores/PersonStore'
import { useRoute } from 'vue-router'

import BaseButton from '../shared/BaseButton.vue'
import Typography from '../shared/Typography.vue'

const $props = defineProps({
    id: {
        type: Number
    },
    name: {
        type: String,
        default: 'Unnamed'
    },
    description: {
        type: String,
        default: 'No Description'
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 109999
    },
    imageName: {
        type: String,
        default: ''
    }
})

const cartStore = useCartStore()
const productStore = useProductStore()
const personStore = usePersonStore()
const $route = useRoute()

const imgSource = ref('')
const personId = computed(() => personStore.loginedPersonId)
const productLink = computed(() => `/${$route.params.category}/product/${$props.id}`)
const product = computed(() => productStore.getProductById($props.id))

const onClick = (id) => {
    if (!cartStore.isInCart(personId.value, id)) {
        cartStore.addToCart(personId.value, id)
    }
}

import(`../assets/${$props.imageName}.png`).then((imageImports) => {
    imgSource.value = imageImports.default
})
</script>

<template>
    <div class="product-card">
        <RouterLink :to="productLink">
            <img
                class="product-card__image"
                :src="imgSource"
                alt="failed"
            />
        </RouterLink>
        <section class="product-card__container">
            <div class="product-card__description">
                <div class="flex items-center gap-2">
                    <RouterLink :to="productLink">
                        <Typography tag-name="p">{{ name }}</Typography>
                    </RouterLink>
                    <Typography tag-name="p">
                        {{ product.totalRating.toFixed(1) }}
                        <span class="star">★</span>
                    </Typography>
                </div>
                <Typography>{{ description }}</Typography>
            </div>
            <Typography class="product-card__quantity">{{ quantity }}</Typography>
            <div class="product-card__actions">
                <Typography>{{ price }} Руб.</Typography>
                <div v-if="personId !== -1">
                    <BaseButton
                        v-if="!cartStore.isInCart(personId, id)"
                        size="m"
                        color="primary"
                        @click="onClick(id)"
                    >
                        В корзину
                    </BaseButton>
                    <BaseButton
                        v-else
                        size="m"
                        color="disabled"
                        @click="cartStore.removeFromCart(personId, id)"
                    >
                        Убрать
                    </BaseButton>
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
