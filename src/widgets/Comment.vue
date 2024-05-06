<script setup>
    import { computed, ref } from 'vue'
    //Хранилища
    import { usePersonStore } from '../stores/PersonStore'
    import { useCommentStore } from '../stores/CommentStore'
    //Компоненты
    import Raiting from '../features/Rating.vue'
    import BaseIcon from '../shared/BaseIcon.vue'
    import Typography from '../shared/Typography.vue'
    import ImageCard from './ImageCard.vue'

    const $props = defineProps({
        data: {
            id: {
                type: Number,
                required: true,
            },
            person: {
                type: Object,
                required: true,
            },
            advantage: {
                type: Object,
                required: true,
            },
            disadvantage: {
                type: Object,
                required: true,
            },
            comment: {
                type: Object,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },

            date: {
                type: String,
                required: true,
            },
            images: {
                type: Array,
                required: false,
            },
        },
    })

    const $emits = defineEmits(['onDelete', 'onEdit'])

    const $person_store = usePersonStore()
    const $comment_store = useCommentStore()

    const _logined_person = computed(() => $person_store.getCurrentPerson)
    const _rating = ref($props.data?.rating)
    const TOTAL_RATING = 5

    const onDelete = () => {
        console.log('delete')
        $emits('onDelete', $props.data?.id)
    }
    const onEdit = () => {
        console.log('edit')
        $emits('onEdit', $props.data?.id)
    }
</script>

<template>
    <div class="comment">
        <div class="space-y-3">
            <div class="comment__head">
                <div class="w-12 h-12 bg-black rounded-full"></div>
                <div>
                    <Typography>{{ data?.person?.name }}</Typography>
                    <div class="text-gray-400">
                        {{
                            `${new Date(
                                data?.date
                            ).toLocaleDateString()} ${new Date(
                                data?.date
                            ).toLocaleTimeString('ru')}`
                        }}
                    </div>
                </div>
                <Typography>{{ _rating?.toFixed(1) }}</Typography>
                <Raiting
                    :value="_rating"
                    :total_rating="TOTAL_RATING" />
            </div>
            <div class="comment__images">
                <ImageCard
                    v-for="image in data.images"
                    :key="image"
                    :image="image"
                    :readonly="true" />
            </div>
            <Typography>Достоинства: {{ data?.advantage }}</Typography>
            <Typography>Недостатки: {{ data?.disadvantage }}</Typography>
            <Typography>Комментарий: {{ data?.comment }}</Typography>
        </div>
        <div
            v-if="data?.person?.id == _logined_person.id"
            class="flex gap-2">
            <BaseIcon
                @click="onEdit"
                fill="none"
                type="edit" />
            <BaseIcon
                @click="
                    $comment_store.removeComment($route.params.id, data?.id)
                "
                type="x-mark" />
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
