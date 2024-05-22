<script setup>
import { computed } from 'vue'

import { usePersonStore } from '../stores/PersonStore'
import { useCartStore } from '../stores/CartStore'

import PersonMenu from '../features/PersonMenu.vue'
import Logo from '../shared/Logo.vue'
import Navigation from '../features/Navigation.vue'
import Button from '../shared/Button.vue'

const personStore = usePersonStore()
const cartStore = useCartStore()

const personId = computed(() => personStore.loginedPersonId)
const loginedPerson = computed(() => personStore.getCurrentPerson)
const countOfProducts = computed(
    () => cartStore.getCartByPersonId(personId.value)?.content?.length,
)
</script>

<template>
    <header class="header">
        <div class="header__container">
            <Logo />
            <div class="header-menu">
                <Navigation
                    v-if="personId !== -1"
                    :data="[
                        {
                            label: 'Корзина',
                            icon: 'cart',
                            count: countOfProducts,
                            link: `/cart/${personId}`,
                        },
                    ]"
                />
                <PersonMenu
                    v-if="personId !== -1"
                    :name="loginedPerson?.name"
                    :secondName="loginedPerson?.secondName"
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
