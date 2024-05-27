<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCommentStore } from '../stores/CommentStore'
import { usePersonStore } from '../stores/PersonStore'
import Rating from '../features/Rating.vue'
import BaseButton from '../shared/BaseButton.vue'
import Typography from '../shared/Typography.vue'
import FileUpload from '../features/FileUpload.vue'

const props = defineProps({
    productId: Number
})
const emits = defineEmits(['onSubmit'])

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
        images.value
    )

    emits('onSubmit', 'ubmit')
}
</script>

<template>
    <form
        class="comment-form"
        @submit.prevent="onSubmit"
    >
        <div class="comment-form__head">
            <div class="w-12 h-12 bg-black rounded-full" />
            <Typography>{{ loginedPerson?.name }}</Typography>
            <Rating
                :value="rating"
                :total-rating="TOTAL_RATING"
                @update-rating="rating = $event"
            />
        </div>
        <main class="comment-form__fields">
            <textarea
                v-model="advantage"
                class="base-textarea resize-none"
                :rows="3"
                :placeholder="'Достоинства'"
            />
            <textarea
                v-model="disadvantage"
                class="base-textarea resize-none"
                :rows="3"
                :placeholder="'Недостатки'"
            />
            <textarea
                v-model="comment"
                class="base-textarea resize-none"
                :rows="3"
                :placeholder="'Комментарий'"
            />
            <FileUpload
                :images="images"
                @get-images="images = $event"
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
