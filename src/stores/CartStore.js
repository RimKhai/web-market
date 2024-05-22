import { defineStore } from 'pinia'
import { useProductStore } from './ProductStore'

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart: [
            {
                personId: 1,
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

        getCartItemByPersonId: state => {
            return personId =>
                state.cart.find(item => item.personId == personId) ?? -1
        },
        getCartItemById() {
            return (personId, id) =>
                this.getCartItemByPersonId(personId).content?.find(
                    item => item.id == id,
                ) ?? -1
        },

        getTotalCost() {
            return personId =>
                this.getCartItemByPersonId(personId).content.reduce(
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
                    0,
                )
        },
        getTotalQuantity() {
            return personId =>
                this.getCartItemByPersonId(personId).content.reduce(
                    (accum, item) => {
                        if (item.checked) {
                            return accum + item.quantity
                        }
                        return accum
                    },
                    0,
                )
        },
        getCartByPersonId() {
            return personId =>
                this.cart.find(item => item.personId == personId) ?? -1
        },
    },

    actions: {
        addToCart(personId, id) {
            this.getCartByPersonId(personId).content.push({
                id: id,
                quantity: 1,
                checked: true,
            })
        },

        toggleCheck(personId, id) {
            this.getCartItemById(personId, id).checked = !this.getCartItemById(
                personId,
                id,
            ).checked
        },

        toggleAll(personId, value) {
            this.getCartItemByPersonId(personId).content.forEach(
                item => (item.checked = value),
            )
        },

        increaseQuantity(personId, id) {
            this.getCartItemById(personId, id)['quantity'] += 1
        },

        decreaseQuantity(personId, id) {
            this.getCartItemById(personId, id)['quantity'] -= 1
        },

        changeQuantity(personId, id, quantity) {
            this.getCartItemById(personId, id)['quantity'] = quantity
        },

        isInCart(personId, id) {
            this.getCartItemById(personId, id) !== -1 ? true : false
        },

        isChecked(personId, id) {
            return this.getCartItemById(personId, id).checked
        },

        isAllChecked(personId) {
            return this.getCartItemByPersonId(personId).content.reduce(
                (accum, item) => accum * item.checked,
                true,
            )
        },

        removeFromCart(personId, id) {
            this.getCartItemByPersonId(personId).content =
                this.getCartItemByPersonId(personId).content.filter(
                    item => item.id != id,
                )
        },
    },
})
