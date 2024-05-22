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
        password.value,
    )

    if (regSuccessful.value === true) {
        router.push(`/welcome/${id.value}`)
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
                v-model="name"
                placeholder="Имя"
                type="text"
            />
            <input
                class="base-input"
                v-model="secondName"
                placeholder="Фамилия"
            />
        </div>
        <input
            class="base-input"
            v-model="email"
            placeholder="E-mail"
            type="email"
        />
        <input
            class="base-input"
            v-model="password"
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
