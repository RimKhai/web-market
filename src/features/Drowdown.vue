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
            <slot name="button"></slot>
        </div>
        <div
            class="dropdown__panel"
            v-show="isOpen"
        >
            <slot name="panel"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropdown_button {
    padding: 24px;
}
</style>
