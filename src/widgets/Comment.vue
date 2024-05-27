<script setup>
import { computed, ref } from 'vue'
import { usePersonStore } from '../stores/PersonStore'
import { useCommentStore } from '../stores/CommentStore'
import Raiting from '../features/Rating.vue'
import BaseIcon from '../shared/BaseIcon.vue'
import Typography from '../shared/Typography.vue'
import ImageCard from './ImageCard.vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    data: {
        type: Object,
        id: {
            type: Number,
            required: true
        },
        person: {
            type: Object,
            required: true
        },
        advantage: {
            type: Object,
            required: true
        },
        disadvantage: {
            type: Object,
            required: true
        },
        comment: {
            type: Object,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },

        date: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: false
        }
    }
})

const emits = defineEmits(['onDelete', 'onEdit'])
const $route = useRoute()

const personStore = usePersonStore()
const commentStore = useCommentStore()

const loginedPerson = computed(() => personStore.getCurrentPerson)
const rating = ref(props.data?.rating)
const totalRating = 5

const onDelete = () => {
    commentStore.removeComment($route.params.id, props.data?.id)
    emits('onDelete', props.data?.id)
}
const onEdit = () => {
    emits('onEdit', props.data?.id)
}
</script>

<template>
    <div class="comment">
        <div class="space-y-3">
            <div class="comment__head">
                <div class="w-12 h-12 bg-black rounded-full" />
                <div>
                    <Typography>{{ props.data?.person?.name }}</Typography>
                    <div class="text-gray-400">
                        {{
                            `${new Date(props.data?.date).toLocaleDateString()} ${new Date(
                                props.data?.date
                            ).toLocaleTimeString('ru')}`
                        }}
                    </div>
                </div>
                <Typography>{{ rating?.toFixed(1) }}</Typography>
                <Raiting
                    :value="rating"
                    :total_rating="totalRating"
                />
            </div>
            <div class="comment__images">
                <ImageCard
                    v-for="image in props.data.images"
                    :key="image"
                    :image="image"
                    :readonly="true"
                />
            </div>
            <Typography>Достоинства: {{ props.data?.advantage }}</Typography>
            <Typography>Недостатки: {{ props.data?.disadvantage }}</Typography>
            <Typography>Комментарий: {{ props.data?.comment }}</Typography>
        </div>
        <div
            v-if="props.data?.person?.id == loginedPerson.id"
            class="flex gap-2"
        >
            <BaseIcon
                fill="none"
                type="edit"
                @click="onEdit"
            />
            <BaseIcon
                type="x-mark"
                @click="onDelete"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.comment {
    background: $primary-surface;
    display: flex;
    justify-content: space-between;
    padding: 32px;
    border-radius: 20px;
}
.comment__head {
    display: flex;
    align-items: center;
    gap: 16px;
}
.comment__images {
    display: flex;
    width: 380px;
    overflow-y: auto;
}
</style>
