<script setup>
import icons from '../../icons.js'

defineProps({
    type: {
        type: String,
        required: true
    },
    fill: {
        type: String,
        required: false,
        default: 'currentColor'
    }
})
</script>

<template>
    <svg
        :class="$attrs.class || ' w-6 h-6'"
        :fill="fill || 'currentColor'"
        stroke="currentColor"
        view-box="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="icon"
        v-html="icons[type]"
    />
</template>
