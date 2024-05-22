<script setup>
import { computed } from 'vue'

import { usePersonStore } from '../stores/PersonStore'
import { useCartStore } from '../stores/CartStore'

import PersonMenu from '../features/PersonMenu.vue'
import Logo from '../shared/Logo.vue'
import Navigation from '../features/Navigation.vue'
import Button from '../shared/Button.vue'

const $person_store = usePersonStore()
const $cart_store = useCartStore()

const _person_id = computed(() => $person_store.logined_person_id)
const _logined_person = computed(() => $person_store.getCurrentPerson)
const _count_of_products = computed(
    () => $cart_store.getCartByPersonId(_person_id.value)?.content?.length,
)
</script>

<template>
    <header class="header">
        <div class="header__container">
            <Logo />
            <div class="header-menu">
                <Navigation
                    v-if="_person_id !== -1"
                    :data="[
                        {
                            label: 'Корзина',
                            icon: 'cart',
                            count: _count_of_products,
                            link: `/cart/${_person_id}`,
                        },
                    ]"
                />
                <PersonMenu
                    v-if="_person_id !== -1"
                    :name="_logined_person?.name"
                    :secondName="_logined_person?.second_name"
                />
                <RouterLink
                    v-else
                    class="flex items-center"
                    to="/authorization/auth"
                >
                    <Button> Войти </Button>
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    border-bottom: 2px solid gray;
    height: 72px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $background-color;
    z-index: 50;
}

.header__container {
    display: flex;
    align-items: center;
    margin: 0 24px;
    justify-content: space-between;
    height: 100%;
}

.header-menu {
    display: flex;
    align-items: center;
    gap: 0 24px;
}
</style>
