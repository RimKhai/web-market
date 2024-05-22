<script setup>
import { defineProps, defineEmits } from 'vue'
import BaseIcon from '../shared/BaseIcon.vue'

const props = defineProps({
    value: Number,
    total_rating: Number,
})

const $emit = defineEmits('updateRating', value)

const setRating = star => {
    $emit('updateRating', star)
}
</script>

<template>
    <div class="wrapper">
        <span
            v-for="star in total_rating"
            :key="star"
            class="star"
            :class="{ filled: star <= value }"
            @click="setRating(star)"
        >
            <BaseIcon type="star" />
        </span>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    gap: 2px;
}

.star {
    cursor: pointer;
    color: #d8d8d8;
}

.star:hover,
.star:active,
.star.filled {
    color: $accent-color;
}
</style>
