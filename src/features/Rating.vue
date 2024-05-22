<script setup>
import BaseIcon from '../shared/BaseIcon.vue'

const props = defineProps({
    value: Number,
    totalRating: Number,
})

const emit = defineEmits(['updateRating'])

const setRating = star => {
    emit('updateRating', star)
}
</script>

<template>
    <div class="wrapper">
        <span
            v-for="star in totalRating"
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
