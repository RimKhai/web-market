<script setup>
import { ref } from 'vue'
import { router } from '../../router'

import { usePersonStore } from '../../stores/PersonStore'

import Button from '../../shared/Button.vue'
import Typography from '../../shared/Typography.vue'

const $person_store = usePersonStore()

const _email = ref('')
const _password = ref('')
const _auth_success = ref(true)

const login = (email, password) => {
    console.log($person_store.login(email, password))
    if ($person_store.login(email, password)) {
        router.push(
            '/welcome/' +
                $person_store.person[$person_store.getPersonIndexByEmail(email)]
                    .id,
        )
    } else {
        _auth_success.value = false
    }
}
</script>

<template>
    <form
        @submit.prevent="console.log('auth')"
        class="authorization__form"
    >
        <input
            class="base-input"
            v-model="_email"
            placeholder="E-mail"
            type="email"
        />
        <input
            class="base-input"
            v-model="_password"
            placeholder="Пароль"
            type="password"
        />
        <Button
            class="authorization__button"
            @click="login(_email, _password)"
        >
            Войти
        </Button>
        <Typography
            v-if="!_auth_success"
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
