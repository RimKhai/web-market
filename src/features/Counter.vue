<script setup>
import { ref } from 'vue'

import BaseIcon from '../shared/BaseIcon.vue'


const props = defineProps({
    value: Number
})
const emits = defineEmits(['onMinus', 'onPlus', 'onChange'])

const count = ref(props.value)

const onMinus = () => {
    count.value--
    emits('onMinus', count.value)
}

const onPlus = () => {
    count.value++
    emits('onPlus', count.value)
}

const onChange = (event) => {
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
            class="h-6 w-6 border-b-2 border-gray-500 outline-none text-center"
            data-testid="input"
            @change="onChange"
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
