<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useCommentStore } from '../stores/CommentStore'
import { usePersonStore } from '../stores/PersonStore'
import { useRoute } from 'vue-router'
import Rating from '../features/Rating.vue'
import BaseButton from '../shared/BaseButton.vue'
import Typography from '../shared/Typography.vue'
import FileUpload from '../features/FileUpload.vue'

const props = defineProps(['productId'])
const emits = defineEmits(['onSubmit'])
const route = useRoute()

const commentStore = useCommentStore()
const personStore = usePersonStore()

const TOTAL_RATING = 5

const commentPerson = onMounted(() => {
    return commentStore.getCommentByPersonId(props.productId, 1)
})

const loginedPerson = computed(() => personStore.getCurrentPerson)
const commentSuccess = ref(true)

const rating = ref(commentPerson()?.rating ?? 0)
const advantage = ref(commentPerson()?.advantage ?? '')
const disadvantage = ref(commentPerson()?.disadvantage ?? '')
const comment = ref(commentPerson()?.comment ?? '')
const images = ref(commentPerson()?.images ?? [])

const onSubmit = () => {
    commentSuccess.value = commentStore.addComment(
        props.productId,
        loginedPerson.value,
        advantage.value,
        disadvantage.value,
        comment.value,
        rating.value,
        images.value,
    )

    emits('onSubmit', 'ubmit')
}
</script>

<template>
    <form
        @submit.prevent="onSubmit"
        class="comment-form"
    >
        <div class="comment-form__head">
            <div class="w-12 h-12 bg-black rounded-full"></div>
            <Typography>{{ loginedPerson?.name }}</Typography>
            <Rating
                :value="rating"
                :totalRating="TOTAL_RATING"
                @updateRating="rating = $event"
            />
        </div>
        <main class="comment-form__fields">
            <textarea
                class="base-textarea resize-none"
                :rows="3"
                v-model="advantage"
                :placeholder="'Достоинства'"
            ></textarea>
            <textarea
                class="base-textarea resize-none"
                :rows="3"
                v-model="disadvantage"
                :placeholder="'Недостатки'"
            ></textarea>
            <textarea
                class="base-textarea resize-none"
                :rows="3"
                v-model="comment"
                :placeholder="'Комментарий'"
            ></textarea>
            <FileUpload
                :images="images"
                @getImages="images = $event"
            />
        </main>
        <Typography
            v-if="!commentSuccess"
            class="comment-form-warn"
            >Все поля должны быть заполнены</Typography
        >
        <div class="comment-form__submit-button">
            <BaseButton @click="onSubmit"> Отправить </BaseButton>
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
