<script setup>
import { ref, defineEmits } from 'vue'

import BaseIcon from '../shared/BaseIcon.vue'
import Typography from '../shared/Typography.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'blur'])

const isEditable = ref(false)

const blur = () => {
    isEditable.value = false
    emit('blur', isEditable)
}

</script>

<template>
    <div
        v-if="isEditable"
    >
        <input
            :value="modelValue"
            @blur="blur()"
            @keyup.enter="isEditable = false"
            @input="emit('update:modelValue', $event.target.value)"
        />
    </div>
    <div
        v-else
        class="flex space-x-2"
        @click="isEditable = true"
    >
        <Typography>{{ modelValue }}</Typography>
        <BaseIcon
            fill="none"
            type="edit"
        />
    </div>
</template>

<style lang="scss" scoped>
input {
    background-color: rgba($color: #000000, $alpha: 0);
    @apply h-6 border-b-2 border-gray-600 outline-none text-left;
}
</style>
