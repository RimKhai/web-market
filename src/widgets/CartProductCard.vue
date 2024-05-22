<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/CartStore'
import { usePersonStore } from '../stores/PersonStore'
import Counter from '../features/Counter.vue'
import BaseCheckbox from '../features/BaseCheckbox.vue'
import Typography from '../shared/Typography.vue'

const $props = defineProps({
    id: Number,
    name: String,
    price: Number,
    image_name: String,
})

const $cart_store = useCartStore()
const $person_store = usePersonStore()
const _person_id = computed(() => $person_store.logined_person_id)
const _img_src = ref()
const _product_link = computed(() => `/all/product/${$props.id}`)

const plus = id => {
    $cart_store.increaseQuantity(_person_id.value, id)
}

const minus = id => {
    $cart_store.decreaseQuantity(_person_id.value, id)
    removeCartItemOnZero(id)
}
const change = (event, id) => {
    $cart_store.changeQuantity(_person_id.value, id, event.target.value)
    removeCartItemOnZero(id)
}

const removeCartItemOnZero = id => {
    if ($cart_store.getCartItemById(_person_id.value, id).quantity <= 0) {
        $cart_store.removeFromCart(_person_id.value, id)
    }
}

import(`../assets/${$props.image_name}.png`).then(image_imports => {
    _img_src.value = image_imports.default
})
</script>

<template>
    <div class="cart-product-card">
        <BaseCheckbox
            @onClick="$cart_store.toggleCheck(_person_id, id)"
            :checked="$cart_store.isChecked(_person_id, $props.id)"
        />
        <RouterLink :to="_product_link">
            <img
                class="cart-product-card__image"
                :src="_img_src"
                alt="failed"
            />
        </RouterLink>
        <RouterLink :to="_product_link">
            <Typography tag_name="h4">{{ name }}</Typography>
        </RouterLink>
        <div class="cart-product-card__actions">
            <Counter
                @onMinus="minus(id)"
                @onPlus="plus(id)"
                @onChange="event => change(event, id)"
            />
            <Typography
                @click="$cart_store.removeFromCart(_person_id, id)"
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
