<script setup>
import { ref, watchEffect } from 'vue'
import ImageCard from '../widgets/ImageCard.vue'

const props = defineProps({
    images: {
        type: Array,
        default: () => []
    }
})

const mImage = ref(props?.images ?? [])
const mFile = ref()

const emits = defineEmits(['getImages'])

const onChange = (event) => {
    mFile.value = event.target.files || event.dataTransfer.files

    if (!mFile.value.length) return

    Object.keys(mFile.value).map((item) => {
        mImage.value = [...mImage.value, URL.createObjectURL(mFile.value[item])]
    })
}

const removeImage = (image) => {
    mImage.value = mImage.value.filter((item) => item !== image)
    console.log(image)
}

watchEffect(() => {
    emits('getImages', mImage.value)
})
</script>

<template>
    <div class="file-upload">
        <div class="file-upload__image-container">
            <ImageCard
                v-for="image in mImage"
                :key="image"
                :image="image"
                @on-remove="removeImage(image)"
            />
        </div>
        <div class="file-upload__area">
            <input
                id=""
                class="file-upload__input"
                type="file"
                :files="files"
                multiple
                name=""
                @input="onChange"
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
    cursor: pointer;
}
.file-upload__image-container {
    display: flex;
    width: 100%;
    max-width: 500px;
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
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: green;
}

.file-upload__button {
    padding: 4px 8px;
    background: $primary-color;
    border-radius: 10px;
}
</style>
