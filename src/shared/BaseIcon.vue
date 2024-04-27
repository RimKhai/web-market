<script setup>
    const props = defineProps(['type', 'fill'])
    import icons from '../icons.js'
</script>

<template>
    <svg
        :class="$attrs.class || ' w-6 h-6'"
        :fill="fill || 'currentColor'"
        stroke="currentColor"
        view-box="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        v-html="icons[type]"
        data-testid="icon"></svg>
</template>

<style lang="scss" scoped></style>
