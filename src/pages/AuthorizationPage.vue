<script setup>
import { onMounted } from 'vue'
import { router } from '../router'

import { usePersonStore } from '../stores/PersonStore'

import { RouterLink } from 'vue-router'
import Typography from '../shared/Typography.vue'

onMounted(() => {
    if (usePersonStore().logined_person_index !== -1) {
        router.push('/')
    }
})
</script>
<template>
    <main class="authorization">
        <RouterLink to="/"
            ><Typography
                tag_name="h2"
                class="logo"
                >Web Market</Typography
            ></RouterLink
        >
        <RouterView />
    </main>
</template>

<style lang="scss">
.authorization {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0px 12px;
    margin-top: 24px;
}
.logo {
    color: $text-color;
    transition-duration: 5000ms;
    margin: 36px 0px;
    &:hover {
        color: $accent-color;
    }
}
.authorization__link {
    color: $accent-color;
    text-decoration: underline;
    align-self: flex-end;
}
.authorization__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: $primary-surface;
    padding: 38px;
    border-radius: 20px;
}
</style>
