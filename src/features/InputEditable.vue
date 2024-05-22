<script setup>
import { ref, defineEmits } from 'vue'

import BaseIcon from '../shared/BaseIcon.vue'
import Typography from '../shared/Typography.vue'

const props = defineProps(['text'])

const emits = defineEmits(['onChange'])

const isEditable = ref(false)
</script>

<template>
    <div v-if="isEditable">
        <input
            @blur="isEditable = false"
            @keyup.enter="isEditable = false"
            :value="text"
            @change="onChange"
        />
    </div>
    <div
        v-else
        class="flex space-x-2"
        @click="isEditable = true"
    >
        <Typography>{{ text }}</Typography>
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
