<script setup>
    import BaseIcon from '../shared/BaseIcon.vue'

    const $emits = defineEmits(['removeImage'])
    const $props = defineProps(['image', 'readonly'])

    const onRemove = () => {
        $emits('onRemove', $props.image)
    }
</script>

<template>
    <div class="image-card">
        <img
            class="image-card__image"
            :src="image"
            alt="" />
        <BaseIcon
            v-if="!readonly"
            class="file-upload__x-mark"
            type="x-mark"
            @click="onRemove" />
    </div>
</template>

<style lang="scss" scoped>
    .image-card {
        width: 150px;
        display: flex;
    }
    .image-card__image {
        width: 100px;
        margin: auto;
        display: block;
        margin-bottom: 10px;
    }
</style>
