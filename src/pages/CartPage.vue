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

    const $cart_store = useCartStore()
    const $product_store = useProductStore()
    const $person_store = usePersonStore()
    const $route = useRoute()
    const _person_id = computed(() => $person_store.logined_person_id)
    const _cart = computed(() => $cart_store.getCartItemByPersonId(_person_id.value))

    const checkboxHandler = () => {
        $cart_store.toggleAll(
            _person_id.value,
            !$cart_store.isAllChecked(_person_id.value)
        )
    }

    watchEffect(() => {
        if (_person_id.value === -1) {
            router.push('/authorization/reg')
        } else if ($route.params.id !== _person_id.value) {
            router.push(`/cart/${_person_id.value}`)
        }
    })
</script>

<template>
    <div class="cart">
        <div
            v-if="
                _cart?.content?.length !== 0
            "
            class="cart__check-all">
            <BaseCheckbox
                class="check-all"
                @onClick="checkboxHandler()"
                :checked="$cart_store.isAllChecked(_person_id)" />
            <Typography @click="checkboxHandler()">Выбрать все</Typography>
        </div>
        <div
            v-for="product in _cart.content"
            :key="product.id">
            <CartProductCard
                :id="product.id"
                :name="$product_store.getProductById(product.id)?.name"
                :price="$product_store.getProductById(product.id)?.price"
                :image_name="$product_store.getProductById(product.id).image_name" />
        </div>
        <div
            v-if="_cart.content.length == 0"
            class="text-center space-y-4">
            <Typography tag_name="h2">в корзине ничего нет</Typography>
            <RouterLink to="/">
                <Typography
                    tag_name="h3"
                    class="underline text-blue-600">
                    добавьте товары в корзину
                </Typography>
            </RouterLink>
        </div>
        <div class="h-[200px]"></div>
    </div>

    <footer>
        <p class="flex space-x-1">
            {{ `Итог: ${$cart_store.getTotalCost(_person_id)} Руб.` }}
        </p>

        <p>
            {{ `Количество товаров: ${$cart_store.getTotalQuantity(_person_id)}` }}
        </p>
        <RouterLink to="/order-reg">
            <Button
                class="cart-button"
                :disabled="$cart_store.getTotalQuantity(_person_id) ? false : true">
                {{
                    $cart_store.getTotalQuantity(_person_id)
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
