import { defineStore } from 'pinia'
import { useProductStore } from './ProductStore'

export const useCommentStore = defineStore('commentStore', {
    state: () => ({
        comments: [
            {
                product_id: 1,
                content: [
                    {
                        id: 1,
                        person: {
                            id: 1,
                            name: 'Настя',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 2,
                        date: Date.now(),
                    },
                    {
                        id: 2,
                        person: {
                            id: 3,
                            name: 'Саня',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 4,
                        date: Date.now(),
                    },
                    {
                        id: 3,
                        person: {
                            id: 2,
                            name: 'Рим',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 5,
                        date: Date.now(),
                    },
                ],
                person_ids: new Set([1, 2, 3]),
            },
            {
                product_id: 2,
                content: [
                    {
                        id: 1,
                        person: {
                            id: 4,
                            name: 'Женя',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 2,
                        date: Date.now(),
                    },
                    {
                        id: 2,
                        person: {
                            id: 5,
                            name: 'Никита',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 4,
                        date: Date.now(),
                    },
                    {
                        id: 3,
                        person: {
                            id: 6,
                            name: 'Илья',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 5,
                        date: Date.now(),
                    },
                ],
                person_ids: new Set([4, 5, 6]),
            },
            {
                product_id: 3,
                content: [
                    {
                        id: 1,
                        person: {
                            id: 7,
                            name: 'Лиза',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 2,
                        date: Date.now(),
                    },
                    {
                        id: 2,
                        person: {
                            id: 1,
                            name: 'Настя',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 4,
                        date: Date.now(),
                    },
                    {
                        id: 3,
                        person: {
                            id: 8,
                            name: 'Ваня',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 5,
                        date: Date.now(),
                    },
                ],
                person_ids: new Set([7, 1, 8]),
            },
            {
                product_id: 4,
                content: [
                    {
                        id: 1,
                        person: {
                            id: 7,
                            name: 'Лиза',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 2,
                        date: Date.now(),
                    },
                    {
                        id: 2,
                        person: {
                            id: 1,
                            name: 'Настя',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 4,
                        date: Date.now(),
                    },
                    {
                        id: 3,
                        person: {
                            id: 8,
                            name: 'Ваня',
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 5,
                        date: Date.now(),
                    },
                ],
                person_ids: new Set([1, 7, 8]),
            },
        ],
    }),

    getters: {
        getCommentByProductId: (state) => {
            return (product_id) =>
                state.comments.find((item) => item.product_id == product_id) ??
                -1
        },
        getCommentById() {
            return (product_id, id) =>
                this.getCommentByProductId(product_id).content?.find(
                    (item) => item.id == id
                ) ?? -1
        },
        getCommentByPersonId() {
            return (product_id, person_id) =>
                this.getCommentByProductId(product_id).content?.find(
                    (item) => item.person.id == person_id
                ) ?? -1
        },
    },

    actions: {
        setPerson(product_id, id, person) {
            this.getCommentById(product_id, id)['person'] = person
        },

        setAdvantage(product_id, id, advantage) {
            this.getCommentById(product_id, id)['advantage'] = advantage
        },
        setDisadvantage(product_id, id, disadvantage) {
            this.getCommentById(product_id, id)['disadvantage'] = disadvantage
        },
        setComment(product_id, id, comment) {
            this.getCommentById(product_id, id)['comment'] = comment
        },
        setRating(product_id, id, rating) {
            this.getCommentById(product_id, id)['rating'] = rating
        },

        addComment(
            product_id,
            person,
            advantage,
            disadvantage,
            comment,
            rating,
            images
        ) { 
            console.log(advantage, disadvantage, comment)
            if (
                advantage.trim() === '' &&
                disadvantage.trim() === '' &&
                comment.trim() === ''
            ) {
                return false
            }
            if (this.getCommentByProductId(product_id) == -1) {
                this.comments = [
                    ...this.comments,
                    {
                        product_id: Number(product_id),
                        content: [],
                        person_ids: new Set(),
                    },
                ]
            }

            if (
                this.getCommentByProductId(product_id).person_ids.has(person.id)
            ) {
                this.getCommentByPersonId(product_id, person.id).advantage =
                    advantage
                this.getCommentByPersonId(product_id, person.id).disadvantage =
                    disadvantage
                this.getCommentByPersonId(product_id, person.id).comment =
                    comment
                this.getCommentByPersonId(product_id, person.id).rating = rating
                this.getCommentByPersonId(product_id, person.id).images = images
            } else {
                this.getCommentByProductId(product_id).content = [
                    ...this.getCommentByProductId(product_id).content,
                    {
                        id:
                            this.getCommentByProductId(product_id).content
                                .length == 0
                                ? 1
                                : Number(
                                      this.getCommentByProductId(product_id)
                                          .content[
                                          this.getCommentByProductId(product_id)
                                              .content.length - 1
                                      ]['id']
                                  ) + 1,
                        person: {
                            id: person.id,
                            name: person.name,
                        },
                        advantage: advantage,
                        disadvantage: disadvantage,
                        comment: comment,
                        rating: rating,
                        images: images,
                        date: Date.now(),
                    },
                ]
            }
            this.getCommentByProductId(product_id).person_ids.add(person.id)
            useProductStore().getProductById(product_id).totalRating =
                this.getCommentByProductId(product_id).content.reduce(
                    (accum, item) => {
                        return accum + Number(item.rating)
                    },
                    0
                ) /
                (this.getCommentByProductId(product_id).content.length == 0
                    ? 1
                    : this.getCommentByProductId(product_id).content.length)

            console.log(this.getCommentByPersonId(product_id, person.id))
            return false
        },

        removeComment(product_id, id) {
            this.getCommentByProductId(product_id).content =
                this.getCommentByProductId(product_id).content.filter(
                    (item) => {
                        if (item.id === id) {
                            this.getCommentByProductId(
                                product_id
                            ).person_ids.delete(item.person.id)
                        }
                        return item.id !== id
                    }
                )
            console.log(this.getCommentByProductId(product_id))
        },
    },
})
