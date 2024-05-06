<script setup>
    import { computed, onMounted, ref, watchEffect } from 'vue'
    //Хранилища
    import { useCommentStore } from '../stores/CommentStore'
    import { usePersonStore } from '../stores/PersonStore'
    import { useRoute } from 'vue-router'
    //Компоненты
    import Rating from '../features/Rating.vue'
    import Button from '../shared/Button.vue'
    import Typography from '../shared/Typography.vue'
    import FileUpload from '../features/FileUpload.vue'

    const $props = defineProps(['product_id'])
    const $emits = defineEmits(['onSubmit'])
    const $route = useRoute()

    const $comment_store = useCommentStore()
    const $person_store = usePersonStore()

    const TOTAL_RATING = 5

    const _comment_person = onMounted(() => {
        return $comment_store.getCommentByPersonId($props.product_id, 1)
    })

    const _logined_person = computed(() => $person_store.getCurrentPerson)
    const _comment_success = ref(true)

    const _rating = ref(_comment_person()?.rating ?? 0)
    const _advantage = ref(_comment_person()?.advantage ?? '')
    const _disadvantage = ref(_comment_person()?.disadvantage ?? '')
    const _comment = ref(_comment_person()?.comment ?? '')
    const _images = ref(_comment_person()?.images ?? [])

    const onSubmit = () => {
        _comment_success.value = $comment_store.addComment(
            $props.product_id,
            _logined_person.value,
            _advantage.value,
            _disadvantage.value,
            _comment.value,
            _rating.value,
            _images.value
        )

        $emits('onSubmit', 'submit')
    }

    watchEffect(() => console.log(_images.value))
</script>

<template>
    <form @submit.prevent="onSubmit" class="comment-form">
        <div class="comment-form__head">
            <div class="w-12 h-12 bg-black rounded-full"></div>
            <Typography>{{ _logined_person?.name }}</Typography>
            <Rating
                :value="_rating"
                :total_rating="TOTAL_RATING"
                @updateRating="_rating = $event" />
        </div>
        <main class="comment-form__fields">
            <textarea
                class="base-textarea resize-none"
                :rows="3"
                v-model="_advantage"
                :placeholder="'Достоинства'"></textarea>
            <textarea
                class="base-textarea resize-none"
                :rows="3"
                v-model="_disadvantage"
                :placeholder="'Недостатки'"></textarea>
            <textarea
                class="base-textarea resize-none"
                :rows="3"
                v-model="_comment"
                :placeholder="'Комментарий'"></textarea>
            <FileUpload :images="_images" @getImages="(value) => (_images = value)" />
        </main>
        <Typography
            v-if="!_comment_success"
            class="comment-form-warn"
            >Все поля должны быть заполнены</Typography
        >
        <div class="comment-form__submit-button">
            <Button
                @click="onSubmit">
                Отправить
            </Button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
    .comment-form {
        background: $primary-surface;
        padding: 32px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        border-radius: 16px;
    }
    .comment-form__head {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .comment-form__fields {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .comment-form__submit-button {
        display: flex;
        justify-content: flex-end;
    }
    .comment-form-warn {
        color: $pallete-warning;
    }
</style>
