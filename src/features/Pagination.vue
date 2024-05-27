<script setup>
import { computed } from 'vue'
import BaseButton from '../shared/BaseButton.vue'

const $props = defineProps({
    itemsCount: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    }
})
defineEmits(['changePage'])

const pageCount = computed(() => Math.ceil($props.itemsCount / $props.itemsPerPage))
const pages = computed(() => Array.from({ length: pageCount.value }, (_, i) => i + 1))
</script>

<template>
    <div>
        <slot />
        <div
            v-show="itemsCount > itemsPerPage"
            class="flex space-x-1"
        >
            <BaseButton
                v-if="currentPage != 1 && currentPage > 2"
                @click="$emit('changePage', 1)"
            >
                1
            </BaseButton>
            <BaseButton
                v-if="currentPage > 1"
                @click="$emit('changePage', currentPage - 1)"
            >
                {{ currentPage - 1 }}
            </BaseButton>
            <BaseButton class="is_active_true">
                {{ currentPage }}
            </BaseButton>
            <BaseButton
                v-if="currentPage + 1 <= pages.length"
                @click="$emit('changePage', currentPage + 1)"
            >
                {{ currentPage + 1 }}
            </BaseButton>
            <BaseButton
                v-if="currentPage != pages.length && pages.length != currentPage + 1"
                @click="$emit('changePage', pages.length)"
            >
                {{ pages.length }}
            </BaseButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.is_active_true {
    background-color: $accent-color;
}
</style>
