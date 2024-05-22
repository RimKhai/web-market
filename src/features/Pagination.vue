<script setup>
import { computed } from 'vue'
import Button from '../shared/Button.vue'

const $emits = defineEmits(['changePage'])

const $props = defineProps({
    itemsCount: {
        type: Number,
        required: true,
    },
    itemsPerPage: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
})

const pageCount = computed(() =>
    Math.ceil($props.itemsCount / $props.itemsPerPage),
)
const pages = computed(() =>
    Array.from({ length: pageCount.value }, (_, i) => i + 1),
)
</script>

<template>
    <div>
        <slot></slot>
        <div
            v-show="itemsCount > itemsPerPage"
            class="flex space-x-1"
        >
            <Button
                v-if="currentPage != 1 && currentPage > 2"
                @click="$emit('changePage', 1)"
            >
                1
            </Button>
            <Button
                v-if="currentPage > 1"
                @click="$emit('changePage', currentPage - 1)"
            >
                {{ currentPage - 1 }}
            </Button>
            <Button class="is_active_true">
                {{ currentPage }}
            </Button>
            <Button
                v-if="currentPage + 1 <= pages.length"
                @click="$emit('changePage', currentPage + 1)"
            >
                {{ currentPage + 1 }}
            </Button>
            <Button
                v-if="
                    currentPage != pages.length &&
                    pages.length != currentPage + 1
                "
                @click="$emit('changePage', pages.length)"
            >
                {{ pages.length }}
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.is_active_true {
    background-color: $accent-color;
}
</style>
