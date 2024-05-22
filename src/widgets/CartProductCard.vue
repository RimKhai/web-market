<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/CartStore'
import { usePersonStore } from '../stores/PersonStore'
import Counter from '../features/Counter.vue'
import BaseCheckbox from '../features/BaseCheckbox.vue'
import Typography from '../shared/Typography.vue'

const props = defineProps({
    id: Number,
    name: String,
    price: Number,
    imageName: String,
})

const cartStore = useCartStore()
const personStore = usePersonStore()
const personId = computed(() => personStore.loginedPersonId)
const imgSrc = ref()
const productLink = computed(() => `/all/product/${props.id}`)

const increaseQuantity = id => {
    cartStore.increaseQuantity(personId.value, id)
}

const decreaseQuantity = id => {
    cartStore.decreaseQuantity(personId.value, id)
    removeCartItemOnZero(id)
}
const changeQuantity = (event, id) => {
    cartStore.changeQuantity(personId.value, id, event.target.value)
    removeCartItemOnZero(id)
}

const removeCartItemOnZero = id => {
    if (cartStore.getCartItemById(personId.value, id).quantity <= 0) {
        cartStore.removeFromCart(personId.value, id)
    }
}

import(`../assets/${props.imageName}.png`).then(imageImports => {
    imgSrc.value = imageImports.default
})
</script>

<template>
    <div class="cart-product-card">
        <BaseCheckbox
            @onClick="cartStore.toggleCheck(personId, props.id)"
            :checked="cartStore.isChecked(personId, props.id)"
        />
        <RouterLink :to="productLink">
            <img
                class="cart-product-card__image"
                :src="imgSrc"
                alt="failed"
            />
        </RouterLink>
        <RouterLink :to="productLink">
            <Typography tagName="h4">{{ name }}</Typography>
        </RouterLink>
        <div class="cart-product-card__actions">
            <Counter
                @onMinus="decreaseQuantity(props.id)"
                @onPlus="increaseQuantity(props.id)"
                @onChange="event => changeQuantity(event, props.id)"
            />
            <Typography
                @click="cartStore.removeFromCart(personId, props.id)"
                class="remover cursor-pointer"
            >
                удалить
            </Typography>
        </div>
        <div class="cart-product-card__price">
            <Typography>{{ price }} руб</Typography>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-product-card {
    display: flex;
    align-items: center;
    gap: 0 24px;
    background-color: rgba($color: $primary-color, $alpha: 0.4);
    padding: 12px 24px;
    border-radius: 16px;
}

.cart-product-card__image {
    width: 120px;
}

.remover {
    text-decoration: underline;
    color: $accent-color;
}
</style>
