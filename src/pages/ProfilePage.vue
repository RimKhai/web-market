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

const clickHandler = () => {
    router.push('/authorization/auth')
    personStore.quit()
}

const onBlur = (e) => {
    personStore.changeName(loginedPerson.value.id, event.target.value)
    personStore.changeSecondName(loginedPerson.value.id, event.target.value)
    personStore.changeEmail(loginedPerson.value.id, event.target.value)
    personStore.changePassword(loginedPerson.value.id, event.target.value)
}

</script>

<template>
    <div class="profile-page">
        <div>
            <div class="h-48 w-32 bg-black rounded-2xl" />
            <BaseButton
                class="profile-page__logout-button"
                @click="() => clickHandler()"
            >
                Выйти
            </BaseButton>
        </div>
        <section>
            <Typography tag-name="h3">Информация профиля</Typography>

            <div class="profile-page__form">
                <Typography class="input-label">Имя:</Typography>
                <InputEditable
                    v-model="name"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">Фамилия:</Typography>
                <InputEditable
                    v-model="secondName"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">E-mail:</Typography>
                <InputEditable
                    v-model="email"
                />
            </div>

            <div class="profile-page__form">
                <Typography class="input-label">Пароль:</Typography>
                <InputEditable
                    v-model="password"
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
