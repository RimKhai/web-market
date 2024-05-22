<script setup>
import { computed, ref } from 'vue'

import { useProductStore } from '../stores/ProductStore'
import { useCartStore } from '../stores/CartStore'
import { useCommentStore } from '../stores/CommentStore'
import { usePersonStore } from '../stores/PersonStore'
import { useRoute } from 'vue-router'

import { TabPanel } from '@headlessui/vue'
import BaseTab from '../features/BaseTab.vue'
import Parameters from '../widgets/Parameters.vue'
import Comment from '../widgets/Comment.vue'
import CommentForm from '../widgets/CommentForm.vue'
import Typography from '../shared/Typography.vue'
import Button from '../shared/Button.vue'
import Rating from '../features/Rating.vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const personStore = usePersonStore()
const commentStore = useCommentStore()
const route = useRoute()
const imgSrc = ref()

const personId = computed(() => personStore.loginedPersonId)
const productId = computed(() => route.params.id)
const product = computed(() => productStore.getProductById(productId.value))
const isEditing = ref(false)
const commentData = computed(() =>
    commentStore.getCommentByPersonId(productId.value, personId.value),
)
const productComment = computed(() =>
    commentStore.getCommentByProductId(productId.value),
)
const commentFormVisibility = computed(
    () =>
        (!productComment.value.personIds?.has(personId.value) ||
            isEditing.value) &&
        personId.value !== -1,
)
const commentVisibility = computed(
    () =>
        (!productComment.value.personIds?.has(personId.value) ||
            !isEditing.value) &&
        personId.value !== -1,
)

const onAddToCart = productId => {
    if (!cartStore.isInCart(personId.value, productId)) {
        cartStore.addToCart(personId.value, productId)
    }
}

import(
    `../assets/${productStore.getProductById(productId.value).imageName}.png`
).then(imageImports => {
    imgSrc.value = imageImports.default
})
</script>

<template>
    <main class="product">
        <Typography tagName="h3">{{ product?.name }}</Typography>
        <div class="flex space-x-4">
            <Typography tagName="h4"
                >Рейтинг: {{ product?.totalRating?.toFixed(1) }}</Typography
            >
            <Rating
                :totalRating="5"
                :value="product?.totalRating"
            />
        </div>
        <div class="product__container">
            <aside class="flex flex-col space-y-3 items-center">
                <img
                    class="product__image"
                    :src="imgSrc"
                    alt="failed"
                />
                <Typography tagName="h4">{{ product?.price }} руб</Typography>
                <div v-if="personId !== -1">
                    <Button
                        size="l"
                        v-if="!cartStore.isInCart(personId, productId)"
                        @click="onAddToCart(productId)"
                        >В корзину</Button
                    >
                    <Button
                        v-else
                        size="l"
                        color="disabled"
                        @click="cartStore.removeFromCart(personId, productId)"
                        >Убрать</Button
                    >
                </div>
            </aside>
            <aside class="product__tabs">
                <BaseTab :tabs="['Характеристики', 'Комментарии']">
                    <TabPanel :class="['rounded-xl tab_panel p-8']">
                        <Parameters :parameters="product.parameters" />
                    </TabPanel>
                    <TabPanel :class="['rounded-xl tab_panel p-8 space-y-4']">
                        <CommentForm
                            v-if="commentFormVisibility"
                            @onSubmit="isEditing = false"
                            :productId="productId"
                        />
                        <Comment
                            v-else-if="commentVisibility"
                            @onEdit="() => (isEditing = true)"
                            :data="commentData"
                        />
                        <div v-else>
                            Авторизуйтесь, чтобы оставлять комментарии
                        </div>
                        <div
                            v-for="comment in productComment.content"
                            :key="comment.id"
                        >
                            <Comment
                                v-if="comment.person.id !== personId"
                                :data="comment"
                            />
                        </div>
                    </TabPanel>
                </BaseTab>
            </aside>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.product {
    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 70%;
    background-color: $primary-surface;
    padding: 36px;
    border-radius: 24px;
}

.product__image {
    width: 360px;
}
.product__container {
    display: flex;
    gap: 36px;
    width: 100%;
}

.product__tabs {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.tab_panel {
    background-color: $background-color;
    color: $text-color;
}
@media screen and (max-width: 1080px) {
    .product__container {
        display: flex;
        flex-direction: column;
    }
}
</style>
