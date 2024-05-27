<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const openDisclosure = () => {
    isOpen.value = true
}

const closeDisclosure = () => {
    setTimeout(() => (isOpen.value = false), 5000)
}
</script>

<template>
    <div
        :class="['dropdown', `is_open_${isOpen}`]"
        @mouseleave="closeDisclosure"
    >
        <div
            class="dropdown__button"
            @mouseenter="openDisclosure"
        >
            <slot name="button" />
        </div>
        <div
            v-show="isOpen"
            class="dropdown__panel"
        >
            <slot name="panel" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropdown_button {
    padding: 24px;
}
</style>
