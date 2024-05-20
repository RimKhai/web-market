<script setup>
import { computed } from 'vue'
import Button from '../shared/Button.vue'

const $emits = defineEmits(['changePage'])

const $props = defineProps({
    items_count: {
        type: Number,
        required: true,
    },
    items_per_page: {
        type: Number,
        required: true,
    },
    current_page: {
        type: Number,
        required: true,
    },
})

console.log($props.items_count)
console.log($props.items_per_page)
console.log($props.current_page)

const _page_count = computed(() => Math.ceil($props.items_count / $props.items_per_page))
const _pages = computed(() => Array.from({ length: _page_count.value }, (_, i) => i + 1))
</script>

<template>
    <div>
        <slot></slot>
        <div
            v-show="items_count > items_per_page"
            class="flex space-x-1"
        >
            <Button
                v-if="current_page != 1 && current_page > 2"
                @click="$emit('changePage', 1)"
            >
                1
            </Button>
            <Button
                v-if="current_page > 1"
                @click="$emit('changePage', current_page - 1)"
            >
                {{ current_page - 1 }}
            </Button>
            <Button class="is_active_true">
                {{ current_page }}
            </Button>
            <Button
                v-if="current_page + 1 <= _pages.length"
                @click="$emit('changePage', current_page + 1)"
            >
                {{ current_page + 1 }}
            </Button>
            <Button
                v-if="current_page != _pages.length && _pages.length != current_page + 1"
                @click="$emit('changePage', _pages.length)"
            >
                {{ _pages.length }}
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.is_active_true {
    background-color: $accent-color;
}
</style>
