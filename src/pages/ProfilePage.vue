<script setup>
import { computed, ref } from 'vue'
import { router } from '../router'

import { usePersonStore } from '../stores/PersonStore'

import InputEditable from '../features/InputEditable.vue'
import Button from '../shared/Button.vue'
import Typography from '../shared/Typography.vue'

const $person_store = usePersonStore()

const _logined_person = computed(() => $person_store.getCurrentPerson)

const _name = ref(_logined_person.value.name)
const _second_name = ref(_logined_person.value.second_name)
const _email = ref(_logined_person.value.email)
const _password = ref(_logined_person.value.password)

const changeName = event => {
    _name.value = event.target.value
    $person_store.changeName(_logined_person.value.id, event.target.value)
}
const changeSecondName = event => {
    _second_name.value = event.target.value
    $person_store.changeSecondName(_logined_person.value.id, event.target.value)
}
const changeEmail = event => {
    _email.value = event.target.value
    $person_store.changeEmail(_logined_person.value.id, event.target.value)
}
const changePassword = event => {
    _password.value = event.target.value
    $person_store.changePassword(_logined_person.value.id, event.target.value)
}

const clickHandler = () => {
    router.push('/authorization/auth')
    $person_store.quit()
}
</script>

<template>
    <div class="profile-page">
        <div>
            <div class="h-48 w-32 bg-black rounded-2xl"></div>
            <Button
                @click="clickHandler"
                class="profile-page__logout-button"
            >
                Выйти
            </Button>
        </div>
        <section>
            <Typography tag_name="h3">Информация профиля</Typography>

            <div class="profile-page__form">
                <Typography class="input-label">Имя:</Typography>
                <InputEditable
                    :text="_name"
                    :onChange="event => changeName(event)"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">Фамилия:</Typography>
                <InputEditable
                    :text="_second_name"
                    :onChange="event => changeSecondName(event)"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">E-mail:</Typography>
                <InputEditable
                    :text="_email"
                    :onChange="event => changeEmail(event)"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">Пароль:</Typography>
                <InputEditable
                    :text="_password"
                    :onChange="event => changePassword(event)"
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
