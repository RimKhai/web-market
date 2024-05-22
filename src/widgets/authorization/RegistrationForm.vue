<script setup>
import { ref } from 'vue'
import { router } from '../../router'

import { usePersonStore } from '../../stores/PersonStore'

import Button from '../../shared/Button.vue'
import Typography from '../../shared/Typography.vue'

const $person_store = usePersonStore()

const _name = ref('')
const _second_name = ref('')
const _email = ref('')
const _password = ref('')
const _id = ref(0)
const _reg_successful = ref(true)

const register = () => {
    _id.value = Date.now()
    _reg_successful.value = $person_store.addNewPerson(
        _id.value,
        _name.value,
        _second_name.value,
        _email.value,
        _password.value,
    )

    if (_reg_successful.value === true) {
        router.push(`/welcome/${_id.value}`)
    }
}
</script>

<template>
    <form
        @submit.prevent="console.log('submit')"
        class="authorization__form"
        @keydown.enter="register"
    >
        <div class="registration__fullname">
            <input
                class="base-input"
                v-model="_name"
                placeholder="Имя"
                type="text"
            />
            <input
                class="base-input"
                v-model="_second_name"
                placeholder="Фамилия"
            />
        </div>
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

        <Button @click="register"> Зарегистрироваться </Button>

        <Typography
            v-if="!_reg_successful"
            class="registration-warn"
            >Все поля должны быть заполнены</Typography
        >

        <button class="authorization__link">
            <RouterLink to="auth">Уже есть аккаунт</RouterLink>
        </button>
    </form>
</template>

<style lang="scss" scoped>
.registration__fullname {
    display: flex;
    gap: 12px;
}

.registration-warn {
    color: $pallete-warning;
}
</style>
