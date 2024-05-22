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

const $product_store = useProductStore()
const $cart_store = useCartStore()
const $person_store = usePersonStore()
const $comment_store = useCommentStore()
const $route = useRoute()
const $img_src = ref()

const _person_id = computed(() => $person_store.logined_person_id)
const _product_id = computed(() => $route.params.id)
const _product = computed(() =>
    $product_store.getProductById(_product_id.value),
)
const _is_editing = ref(false)
const _comment_data = computed(() =>
    $comment_store.getCommentByPersonId(_product_id.value, _person_id.value),
)
const _product_comment = computed(() =>
    $comment_store.getCommentByProductId(_product_id.value),
)
const _comment_form_visibility = computed(
    () =>
        (!_product_comment.value.person_ids?.has(_person_id.value) ||
            _is_editing.value) &&
        _person_id.value !== -1,
)

const _comment_visibility = computed(
    () =>
        (!_product_comment.value.person_ids?.has(_person_id.value) ||
            !_is_editing.value) &&
        _person_id.value !== -1,
)

const onAddToCart = product_id => {
    if (!$cart_store.isInCart(_person_id.value, product_id)) {
        $cart_store.addToCart(_person_id.value, product_id)
    }
}

import(
    `../assets/${
        $product_store.getProductById(_product_id.value).image_name
    }.png`
).then(image_imports => {
    $img_src.value = image_imports.default
})
</script>

<template>
    <main class="product">
        <Typography tag_name="h3">
            {{ _product?.name }}
        </Typography>
        <div class="flex space-x-4">
            <Typography tag_name="h4"
                >Рейтинг: {{ _product?.total_rating?.toFixed(1) }}</Typography
            >
            <Rating
                :total_rating="5"
                :value="_product?.total_rating"
            />
        </div>
        <div class="product__container">
            <aside class="flex flex-col space-y-3 items-center">
                <img
                    class="product__image"
                    :src="$img_src"
                    alt="failed"
                />
                <Typography tag_name="h4">{{ _product?.price }} руб</Typography>
                <div v-if="_person_id !== -1">
                    <Button
                        size="l"
                        v-if="!$cart_store.isInCart(_person_id, _product_id)"
                        @click="onAddToCart(_product_id)"
                    >
                        В корзину
                    </Button>
                    <Button
                        v-else
                        size="l"
                        color="disabled"
                        @click="
                            $cart_store.removeFromCart(_person_id, _product_id)
                        "
                    >
                        Убрать
                    </Button>
                </div>
            </aside>
            <aside class="product__tabs">
                <BaseTab :tabs="['Характеристики', 'Комментарии']">
                    <TabPanel :class="['rounded-xl tab_panel p-8']">
                        <Parameters :parameters="_product.parameters" />
                    </TabPanel>
                    <TabPanel :class="['rounded-xl tab_panel p-8 space-y-4']">
                        <CommentForm
                            v-if="_comment_form_visibility"
                            @onSubmit="_is_editing = false"
                            :product_id="_product_id"
                        />
                        <Comment
                            v-else-if="_comment_visibility"
                            @onEdit="() => (_is_editing = true)"
                            :data="{
                                id: _comment_data.id,
                                person: _comment_data.person,
                                advantage: _comment_data.advantage,
                                disadvantage: _comment_data.disadvantage,
                                comment: _comment_data.comment,
                                rating: _comment_data.rating,
                                date: _comment_data.date,
                                images: _comment_data.images,
                            }"
                        />

                        <div v-else>
                            Авторизуйтесь, чтобы оставлять комментарии
                        </div>

                        <div
                            v-for="comment in _product_comment.content"
                            :key="comment.id"
                        >
                            <Comment
                                v-if="comment.person.id !== _person_id"
                                :data="{
                                    id: comment.id,
                                    person: comment.person,
                                    advantage: comment.advantage,
                                    disadvantage: comment.disadvantage,
                                    comment: comment.comment,
                                    rating: comment.rating,
                                    date: comment.date,
                                }"
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
