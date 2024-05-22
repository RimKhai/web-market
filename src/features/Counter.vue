<script setup>
import { ref } from 'vue'

import BaseIcon from '../shared/BaseIcon.vue'

const count = ref(1)

const emits = defineEmits(['onMinus', 'onPlus', 'onChange'])

const onMinus = () => {
    count.value--
    emits('onMinus', count.value)
}

const onPlus = () => {
    count.value++
    emits('onPlus', count.value)
}

const onChange = event => {
    count.value = event.target.value
    emits('onChange', event)
}
</script>

<template>
    <div class="flex">
        <button @click="onMinus">
            <BaseIcon
                type="minus"
                fill="none"
            />
        </button>
        <input
            :value="count"
            @change="onChange"
            class="h-6 w-6 border-b-2 border-gray-500 outline-none text-center"
            data-testid="input"
        />
        <button @click="onPlus">
            <BaseIcon
                type="plus"
                fill="none"
            />
        </button>
    </div>
</template>

<style lang="scss" scoped>
input {
    background-color: transparent;
}
</style>
