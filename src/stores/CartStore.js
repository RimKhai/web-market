import { defineStore } from 'pinia'
import { useProductStore } from './ProductStore'

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart: [
            {
                person_id: 1,
                content: [
                    {
                        id: 1,
                        quantity: 1,
                        checked: true,
                    },
                    {
                        id: 11,
                        quantity: 1,
                        checked: true,
                    },
                ],
            },
        ],
    }),

    getters: {
        //В случае отсутствия совпадений каждая из функций возращает -1, аналогично встроенному методу indexOf()

        getCartItemByPersonId: (state) => {
            return (person_id) =>
                state.cart.find((item) => item.person_id == person_id) ?? -1
        },
        getCartItemById() {
            return (person_id, id) =>
                this.getCartItemByPersonId(person_id).content?.find(
                    (item) => item.id == id
                ) ?? -1
        },

        getTotalCost() {
            return (person_id) =>
                this.getCartItemByPersonId(person_id).content.reduce(
                    (accum, item) => {
                        if (item.checked) {
                            return (
                                accum +
                                item.quantity *
                                    useProductStore().getProductById(item.id)
                                        .price
                            )
                        }
                        return accum
                    },
                    0
                )
        },
        getTotalQuantity() {
            return (person_id) =>
                this.getCartItemByPersonId(person_id).content.reduce(
                    (accum, item) => {
                        if (item.checked) {
                            return accum + item.quantity
                        }
                        return accum
                    },
                    0
                )
        },
        getCartByPersonId() {
            return (person_id) =>
                this.cart.find((item) => item.person_id == person_id) ?? -1
        },
    },

    actions: {
        addToCart(person_id, id) {
            this.getCartByPersonId(person_id).content.push({
                id: id,
                quantity: 1,
                checked: true,
            })
        },

        toggleCheck(person_id, id) {
            this.getCartItemById(person_id, id).checked = !this.getCartItemById(
                person_id,
                id
            ).checked
        },

        toggleAll(person_id, value) {
            this.getCartItemByPersonId(person_id).content.forEach(
                (item) => (item.checked = value)
            )
        },

        increaseQuantity(person_id, id) {
            this.getCartItemById(person_id, id)['quantity'] += 1
        },

        decreaseQuantity(person_id, id) {
            this.getCartItemById(person_id, id)['quantity'] -= 1
        },

        changeQuantity(person_id, id, quantity) {
            this.getCartItemById(person_id, id)['quantity'] = quantity
        },

        isInCart(person_id, id) {
            this.getCartItemById(person_id, id) !== -1 ? true : false
        },

        isChecked(person_id, id) {
            return this.getCartItemById(person_id, id).checked
        },

        isAllChecked(person_id) {
            return this.getCartItemByPersonId(person_id).content.reduce(
                (accum, item) => accum * item.checked,
                true
            )
        },

        removeFromCart(person_id, id) {
            this.getCartItemByPersonId(person_id).content =
                this.getCartItemByPersonId(person_id).content.filter(
                    (item) => item.id != id
                )
        },
    },
})
