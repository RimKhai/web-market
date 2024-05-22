<script setup>
import { ref } from 'vue'

const emits = defineEmits(['onClick'])
const props = defineProps(['checked'])

const clickHandler = () => {
    emits('onClick', props.checked)
}
</script>

<template>
    <div
        data-testid="checkbox"
        :class="`base-checkbox cursor-pointer ${
            props.checked ? 'checked' : ''
        }`"
        @click="clickHandler()"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            data-testid="checkbox-check"
            stroke-width="2"
            stroke="currentColor"
            :class="`${
                props.checked ? 'opacity-100' : 'opacity-0'
            } w-6 h-6 duration-500`"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
            />
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.base-checkbox {
    background: $background-color;
    border-radius: 5px;
    transition-duration: 500ms;
    &.checked {
        background: $primary-color;
    }
}
</style>
