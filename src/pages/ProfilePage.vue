<script setup>
import { computed, ref } from 'vue'
import { router } from '../router'

import { usePersonStore } from '../stores/PersonStore'

import InputEditable from '../features/InputEditable.vue'
import BaseButton from '../shared/BaseButton.vue'
import Typography from '../shared/Typography.vue'

const personStore = usePersonStore()

const loginedPerson = computed(() => personStore.getCurrentPerson)

const name = ref(loginedPerson.value.name)
const secondName = ref(loginedPerson.value.secondName)
const email = ref(loginedPerson.value.email)
const password = ref(loginedPerson.value.password)

const changeName = (event) => {
    name.value = event.target.value
    personStore.changeName(loginedPerson.value.id, event.target.value)
}
const changeSecondName = (event) => {
    secondName.value = event.target.value
    personStore.changeSecondName(loginedPerson.value.id, event.target.value)
}
const changeEmail = (event) => {
    email.value = event.target.value
    personStore.changeEmail(loginedPerson.value.id, event.target.value)
}
const changePassword = (event) => {
    password.value = event.target.value
    personStore.changePassword(loginedPerson.value.id, event.target.value)
}

const clickHandler = () => {
    router.push('/authorization/auth')
    personStore.quit()
}
</script>

<template>
    <div class="profile-page">
        <div>
            <div class="h-48 w-32 bg-black rounded-2xl" />
            <BaseButton
                class="profile-page__logout-button"
                @click="clickHandler"
            >
                Выйти
            </BaseButton>
        </div>
        <section>
            <Typography tag-name="h3">Информация профиля</Typography>

            <div class="profile-page__form">
                <Typography class="input-label">Имя:</Typography>
                <InputEditable
                    :text="name"
                    :on-change="(event) => changeName(event)"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">Фамилия:</Typography>
                <InputEditable
                    :text="secondName"
                    :on-change="(event) => changeSecondName(event)"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">E-mail:</Typography>
                <InputEditable
                    :text="email"
                    :on-change="(event) => changeEmail(event)"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">Пароль:</Typography>
                <InputEditable
                    :text="password"
                    :on-change="(event) => changePassword(event)"
                />
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.profile-page {
    display: flex;
    gap: 16px;
    justify-content: space-between;
}
.profile-page__logout-button {
    width: 100%;
    margin-top: 16px;
}
.input-label {
    color: rgba(255, 255, 255, 0.6);
}
.profile-page__form {
    display: flex;
    gap: 4px;
}
</style>
