<script setup>
import Typography from '../shared/Typography.vue'

const $props = defineProps(['parameters'])
</script>

<template>
    <div class="param__container">
        <div v-for="key in Object.keys(parameters)" class="param" :key="key">
            <Typography>{{ key }}</Typography>
            <Typography>{{ parameters[key] }}</Typography>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.param__container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.param {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: rgba($color: $primary-color, $alpha: 0.05);
    transition-duration: 500ms;
    border-radius: $border-large;

    &:hover {
        background-color: rgba($color: $accent-color, $alpha: 0.4);
    }
}
</style>
