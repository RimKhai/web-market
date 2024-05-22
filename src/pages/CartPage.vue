<script setup>
import { router } from '../router.js'
import { watchEffect, computed } from 'vue'

import { useCartStore } from '../stores/CartStore'
import { useProductStore } from '../stores/ProductStore'
import { usePersonStore } from '../stores/PersonStore'
import { useRoute } from 'vue-router'

import CartProductCard from '../widgets/CartProductCard.vue'
import Typography from '../shared/Typography.vue'
import Button from '../shared/Button.vue'
import BaseCheckbox from '../features/BaseCheckbox.vue'

const cartStore = useCartStore()
const productStore = useProductStore()
const personStore = usePersonStore()
const route = useRoute()
const personId = computed(() => personStore.loginedPersonId)
const cart = computed(() => cartStore.getCartItemByPersonId(personId.value))

const checkboxHandler = () => {
    cartStore.toggleAll(personId.value, !cartStore.isAllChecked(personId.value))
}

watchEffect(() => {
    if (personId.value === -1) {
        router.push('/authorization/reg')
    } else if (route.params.id !== personId.value) {
        router.push(`/cart/${personId.value}`)
    }
})
</script>

<template>
    <div class="cart">
        <div
            v-if="cart.content.length !== 0"
            class="cart__check-all"
        >
            <BaseCheckbox
                class="check-all"
                @onClick="checkboxHandler()"
                :checked="cartStore.isAllChecked(personId)"
            />
            <Typography @click="checkboxHandler()">Выбрать все</Typography>
        </div>
        <div
            v-for="product in cart.content"
            :key="product.id"
        >
            <CartProductCard
                :id="product.id"
                :name="productStore.getProductById(product.id)?.name"
                :price="productStore.getProductById(product.id)?.price"
                :imageName="productStore.getProductById(product.id).imageName"
            />
        </div>
        <div
            v-if="cart.content.length == 0"
            class="text-center space-y-4"
        >
            <Typography tagName="h2">в корзине ничего нет</Typography>
            <RouterLink to="/">
                <Typography
                    tagName="h3"
                    class="underline text-blue-600"
                >
                    добавьте товары в корзину
                </Typography>
            </RouterLink>
        </div>
        <div class="h-[200px]"></div>
    </div>

    <footer>
        <p class="flex space-x-1">
            {{ `Итог: ${cartStore.getTotalCost(personId)} Руб.` }}
        </p>

        <p>
            {{ `Количество товаров: ${cartStore.getTotalQuantity(personId)}` }}
        </p>
        <RouterLink to="/order-reg">
            <Button
                class="cart-button"
                :disabled="cartStore.getTotalQuantity(personId) ? false : true"
            >
                {{
                    cartStore.getTotalQuantity(personId)
                        ? 'Оформить заказ'
                        : 'Добавьте товары'
                }}
            </Button></RouterLink
        >
    </footer>
</template>

<style lang="scss" scoped>
.cart {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.cart__check-all {
    display: flex;
    gap: 8px;
    cursor: poiner;
}

.check-all {
    background-color: $primary-color;
}

footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 320px;
    background-color: $primary-surface;
    border-top: 3px solid grey;
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
}

.cart-button {
    width: 200px;
}
</style>
