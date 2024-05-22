<script setup>
import { ref, watchEffect } from 'vue'

import BaseIcon from '../shared/BaseIcon.vue'
import ImageCard from '../widgets/ImageCard.vue'

const $props = defineProps(['images'])

const m_image = ref($props?.images ?? [])
const m_file = ref()

const $emits = defineEmits(['getImages'])

const onChange = event => {
    m_file.value = event.target.files || event.dataTransfer.files

    if (!m_file.value.length) return

    Object.keys(m_file.value).map(item => {
        m_image.value = [
            ...m_image.value,
            URL.createObjectURL(m_file.value[item]),
        ]
    })
}

const removeImage = image => {
    m_image.value = m_image.value.filter(item => item !== image)
    console.log(image)
}

watchEffect(() => {
    $emits('getImages', m_image.value)
})
</script>

<template>
    <div class="file-upload">
        <div class="file-upload__image-container">
            <ImageCard
                v-for="image in m_image"
                :key="image"
                :image="image"
                @onRemove="removeImage(image)"
            />
        </div>
        <div class="file-upload__area">
            <input
                class="file-upload__input"
                type="file"
                @input="onChange"
                :files="files"
                multiple
                name=""
                id=""
            />
            <span class="file-upload__button">Выберете файл</span>
            {{ files }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.file-upload {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.file-upload__image-container {
    display: flex;
    width: 100%;
    overflow-y: auto;
}
.file-upload .file-upload__area {
    width: 100%;
    min-height: 140px;
    background-color: $background-color;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid $primary-color;
    border-radius: 15px;
    margin-top: 40px;
    position: relative;
    flex-direction: column;
    gap: 16px;
}
.file-upload__input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    background-color: green;
}

.file-upload__button {
    padding: 4px 8px;
    background: $primary-color;
    border-radius: 10px;
}
</style>
