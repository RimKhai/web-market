import { defineStore } from 'pinia'
import { useCartStore } from './CartStore'

export const usePersonStore = defineStore('personStore', {
    state: () => ({
        person: [
            {
                id: 1,
                name: 'Борис',
                secondName: 'Шест',
                email: 'boris69@gmail.com',
                password: 12345678,
                logined: true
            }
        ],

        // Индекс текущего авторизованного пользователя
        loginedPersonIndex: 0,
        // ID текущего авторизованного пользователя
        loginedPersonId: 1
    }),

    getters: {
        // Получение пользователя по ID
        getPersonById: (state) => (personId) =>
            state.person.find((item) => item.id === personId) ?? -1,

        // Получение индекса пользователя по email
        getPersonIndexByEmail: (state) => (email) =>
            state.person.findIndex((item) => item.email === email) ?? -1,

        // Получение текущего авторизованного пользователя
        getCurrentPerson: (state) => {
            if (state.loginedPersonIndex === -1) {
                return -1
            }
            return state.person[state.loginedPersonIndex]
        }
    },

    actions: {
        // Добавление нового пользователя
        addNewPerson(id, name, secondName, email, password) {
            // Проверка на пустоту полей при регистрации
            if (
                name.trim() === '' &&
                secondName.trim() === '' &&
                email.trim() === '' &&
                password.trim() === ''
            ) {
                return false
            }

            // Добавление пользователя в базу (в данном случае, на клиенте)
            this.person = [
                ...this.person,
                {
                    id: id,
                    name: name,
                    secondName: secondName,
                    email: email,
                    password: password,
                    logined: true
                }
            ]

            // Обновление индекса и ID текущего авторизованного пользователя
            this.loginedPersonIndex = this.person.length - 1
            this.loginedPersonId = id

            // Создание новой корзины для нового пользователя
            useCartStore().cart = [
                ...useCartStore().cart,
                {
                    personId: id,
                    content: []
                }
            ]

            // Возвращает true в случае успешной регистрации пользователя
            return true
        },

        // Сеттеры
        // Изменение имени пользователя по ID
        changeName(id, name) {
            this.getPersonById(id).name = name
        },

        // Изменение фамилии пользователя по ID
        changeSecondName(id, secondName) {
            this.getPersonById(id).secondName = secondName
        },

        // Изменение email пользователя по ID
        changeEmail(id, email) {
            this.getPersonById(id).email = email
        },

        // Изменение пароля пользователя по ID
        changePassword(id, password) {
            this.getPersonById(id).password = password
        },

        // Установка индекса текущего авторизованного пользователя
        setLoginedPerson(index) {
            this.loginedPersonIndex = index
        },

        // Выход из профиля, установка индекса и ID текущего пользователя на -1, что означает отсутствие авторизованного пользователя
        quit() {
            ;(this.person[this.loginedPersonIndex].logined = false),
                (this.loginedPersonIndex = -1),
                (this.loginedPersonId = -1)
        },

        // Проверка пароля при авторизации пользователя
        checkPassword(email, password) {
            if (this.person[this.getPersonIndexByEmail(email)]?.password === password) {
                return true
            }
            return false
        },

        // Функция авторизации уже существующего пользователя
        login(email, password) {
            if (this.checkPassword(email, password)) {
                this.loginedPersonIndex = this.getPersonIndexByEmail(email)
                this.loginedPersonId = this.person[this.loginedPersonIndex].id
                this.getCurrentPerson.logined = true

                return true
            }

            return false
        }
    }
})
