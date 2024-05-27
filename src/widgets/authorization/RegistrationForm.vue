<script setup>
import { ref } from 'vue'
import { router } from '../../router'

import { usePersonStore } from '../../stores/PersonStore'

import BaseButton from '../../shared/BaseButton.vue'
import Typography from '../../shared/Typography.vue'

const $personStore = usePersonStore()

const name = ref('')
const secondName = ref('')
const email = ref('')
const password = ref('')
const id = ref(0)
const regSuccessful = ref(true)

const register = () => {
    id.value = Date.now()
    regSuccessful.value = $personStore.addNewPerson(
        id.value,
        name.value,
        secondName.value,
        email.value,
        password.value
    )

    if (regSuccessful.value === true) {
        router.push(`/welcome/${id.value}`)
    }
}
</script>

<template>
    <form
        class="authorization__form"
        @submit.prevent="console.log('submit')"
        @keydown.enter="register"
    >
        <div class="registration__fullname">
            <input
                v-model="name"
                class="base-input"
                placeholder="Имя"
                type="text"
            />
            <input
                v-model="secondName"
                class="base-input"
                placeholder="Фамилия"
            />
        </div>
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

        <BaseButton @click="register"> Зарегистрироваться </BaseButton>

        <Typography
            v-if="!regSuccessful"
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
