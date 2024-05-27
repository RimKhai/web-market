<script setup>
import { ref } from 'vue'
import { router } from '../../router'

import { usePersonStore } from '../../stores/PersonStore'

import BaseButton from '../../shared/BaseButton.vue'
import Typography from '../../shared/Typography.vue'

const $personStore = usePersonStore()

const email = ref('')
const password = ref('')
const authSuccess = ref(true)

const login = (email, password) => {
    console.log($personStore.login(email, password))
    if ($personStore.login(email, password)) {
        router.push('/welcome/' + $personStore.person[$personStore.getPersonIndexByEmail(email)].id)
    } else {
        authSuccess.value = false
    }
}
</script>

<template>
    <form
        class="authorization__form"
        @submit.prevent="console.log('auth')"
    >
        <input
            v-model="email"
            class="base-input"
            placeholder="E-mail"
            type="email"
        />
        <input
            v-model="password"
            class="base-input"
            placeholder="Пароль"
            type="password"
        />
        <BaseButton
            class="authorization__button"
            @click="login(email, password)"
        >
            Войти
        </BaseButton>
        <Typography
            v-if="!authSuccess"
            class="auth-warn"
        >
            Такой пользователь не найден, пройдите регистрацию
        </Typography>
        <button class="authorization__link">
            <RouterLink to="reg">Регистрация</RouterLink>
        </button>
    </form>
</template>

<style lang="scss" scoped>
input {
    min-width: 400px;
}

.auth-warn {
    color: $pallete-warning;
}
</style>
