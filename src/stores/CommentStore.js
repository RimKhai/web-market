import { defineStore } from 'pinia'
import { useProductStore } from './ProductStore'

export const useCommentStore = defineStore('commentStore', {
    state: () => ({
        comments: [
            {
                productId: 1,
                content: [
                    {
                        id: 1,
                        person: {
                            id: 1,
                            name: 'Борис'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 2,
                        date: Date.now()
                    },
                    {
                        id: 2,
                        person: {
                            id: 3,
                            name: 'Саня'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 4,
                        date: Date.now()
                    },
                    {
                        id: 3,
                        person: {
                            id: 2,
                            name: 'Рим'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 5,
                        date: Date.now()
                    }
                ],
                personIds: new Set([1, 2, 3])
            },
            {
                productId: 2,
                content: [
                    {
                        id: 1,
                        person: {
                            id: 4,
                            name: 'Женя'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 2,
                        date: Date.now()
                    },
                    {
                        id: 2,
                        person: {
                            id: 5,
                            name: 'Никита'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 4,
                        date: Date.now()
                    },
                    {
                        id: 3,
                        person: {
                            id: 6,
                            name: 'Илья'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 5,
                        date: Date.now()
                    }
                ],
                personIds: new Set([4, 5, 6])
            },
            {
                productId: 3,
                content: [
                    {
                        id: 1,
                        person: {
                            id: 7,
                            name: 'Лиза'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 2,
                        date: Date.now()
                    },
                    {
                        id: 2,
                        person: {
                            id: 1,
                            name: 'Борис'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 4,
                        date: Date.now()
                    },
                    {
                        id: 3,
                        person: {
                            id: 8,
                            name: 'Ваня'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 5,
                        date: Date.now()
                    }
                ],
                personIds: new Set([7, 1, 8])
            },
            {
                productId: 4,
                content: [
                    {
                        id: 1,
                        person: {
                            id: 7,
                            name: 'Лиза'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 2,
                        date: Date.now()
                    },
                    {
                        id: 2,
                        person: {
                            id: 1,
                            name: 'Настя'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 4,
                        date: Date.now()
                    },
                    {
                        id: 3,
                        person: {
                            id: 8,
                            name: 'Ваня'
                        },
                        advantage: 'Достоинства',
                        disadvantage: 'Недостатки',
                        comment: 'Комментарий',
                        rating: 5,
                        date: Date.now()
                    }
                ],
                personIds: new Set([1, 7, 8])
            }
        ]
    }),

    getters: {
        getCommentByProductId: (state) => {
            return (productId) => state.comments.find((item) => item.productId == productId)
        },
        getCommentById() {
            return (productId, id) =>
                this.getCommentByProductId(productId)?.content?.find((item) => item.id == id)
        },
        getCommentByPersonId() {
            return (productId, personId) =>
                this.getCommentByProductId(productId)?.content?.find(
                    (item) => item.person.id == personId
                )
        }
    },

    actions: {
        setPerson(productId, id, person) {
            this.getCommentById(productId, id)['person'] = person
        },

        setAdvantage(productId, id, advantage) {
            this.getCommentById(productId, id)['advantage'] = advantage
        },
        setDisadvantage(productId, id, disadvantage) {
            this.getCommentById(productId, id)['disadvantage'] = disadvantage
        },
        setComment(productId, id, comment) {
            this.getCommentById(productId, id)['comment'] = comment
        },
        setRating(productId, id, rating) {
            this.getCommentById(productId, id)['rating'] = rating
        },

        addComment(productId, person, advantage, disadvantage, comment, rating, images) {
            if (advantage.trim() === '' && disadvantage.trim() === '' && comment.trim() === '') {
                return false
            }
            if (this.getCommentByProductId(productId) == -1) {
                this.comments = [
                    ...this.comments,
                    {
                        productId: Number(productId),
                        content: [],
                        personIds: new Set()
                    }
                ]
            }

            if (this.getCommentByProductId(productId).personIds.has(person.id)) {
                this.getCommentByPersonId(productId, person.id).advantage = advantage
                this.getCommentByPersonId(productId, person.id).disadvantage = disadvantage
                this.getCommentByPersonId(productId, person.id).comment = comment
                this.getCommentByPersonId(productId, person.id).rating = rating
                this.getCommentByPersonId(productId, person.id).images = images
            } else {
                this.getCommentByProductId(productId).content = [
                    ...this.getCommentByProductId(productId).content,
                    {
                        id:
                            this.getCommentByProductId(productId).content.length == 0
                                ? 1
                                : Number(
                                      this.getCommentByProductId(productId).content[
                                          this.getCommentByProductId(productId).content.length - 1
                                      ]['id']
                                  ) + 1,
                        person: {
                            id: person.id,
                            name: person.name
                        },
                        advantage: advantage,
                        disadvantage: disadvantage,
                        comment: comment,
                        rating: rating,
                        images: images,
                        date: Date.now()
                    }
                ]
            }
            this.getCommentByProductId(productId).personIds.add(person.id)
            useProductStore().getProductById(productId).totalRating =
                this.getCommentByProductId(productId).content.reduce((accum, item) => {
                    return accum + Number(item.rating)
                }, 0) /
                (this.getCommentByProductId(productId).content.length == 0
                    ? 1
                    : this.getCommentByProductId(productId).content.length)

            return false
        },

        removeComment(productId, id) {
            this.getCommentByProductId(productId).content = this.getCommentByProductId(
                productId
            ).content.filter((item) => {
                if (item.id === id) {
                    this.getCommentByProductId(productId).personIds.delete(item.person.id)
                }
                return item.id !== id
            })
        }
    }
})
