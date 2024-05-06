import { defineStore } from 'pinia'
import { useCartStore } from './CartStore'

export const usePersonStore = defineStore('personStore', {
    state: () => ({
        person: [
            {
                id: 1,
                name: 'Борис',
                second_name: 'Шест',
                email: 'boris69@gmail.com',
                password: 12345678,
                logined: true,
            },
        ],

        //index текущего авторизованного польщователя
        logined_person_index: 0,
        //id текущего авторизованного польщователя
        logined_person_id: 1,
    }),

    getters: {
        getPersonById: (state) => {
            return (person_id) =>
                state.person.find((item) => item.id == person_id) ?? -1
        },

        getPersonIndexByEmail: (state) => {
            return (email) =>
                state.person.findIndex((item) => item.email == email) ?? -1
        },

        getCurrentPerson: (state) => {
            if(state.logined_person_index == -1) {
                return -1
            }
            return state.person[state.logined_person_index]
        },
    },

    actions: {
        addNewPerson(id, name, second_name, email, password) {
            // проверка на пустоту полей при регистрации
            if(name.trim() === '' && second_name.trim() === '' && email.trim() === '' && password.trim() === '') {
                return false
            }
            //Добавление пользователя в базу (В данном случае на клиенте)  
            this.person = [
                ...this.person,
                {
                    id: id,
                    name: name,
                    second_name: second_name,
                    email: email,
                    password: password,
                    logined: true,
                },
            ]
            
            //Обновление индекса и id текущего авторизованного пользователя
            this.logined_person_index = this.person.length - 1
            this.logined_person_id = id


            //Создание корзины нового пользователя
            useCartStore().cart = [
                ...useCartStore().cart,
                {
                    person_id: id,
                    content: [],
                },
            ]

            //Возвращает true в случае успешной регистрации пользователя
            return true
        },

        //сеттеры
        changeName(id, name) {
            this.getPersonById(id).name = name
        },

        changeSecondName(id, second_name) {
            this.getPersonById(id).second_name = second_name
        },

        changeEmail(id, email) {
            this.getPersonById(id).email = email
        },

        changePassword(id, password) {
            this.getPersonById(id).password = password
        },

        setLoginedPerson(index) {
            this.logined_person_index = index
        },


        //выход из профиля, уставновка индекса и id текущего пользователя на -1, что значит отсутствие авотризованного пользователя
        quit() {
            this.person[this.logined_person_index].logined = false,
            this.logined_person_index = -1,
            this.logined_person_id = -1
        },

        //проверка пароля при авторизации пользователя
        checkPassword(email, password) {
            if (
                this.person[this.getPersonIndexByEmail(email)]?.password == password
            ) {
                return true
            }
            return false
        },


        //функция авторизации уже существующего пользователя
        login(email, password) {
            if (this.checkPassword(email, password)) {
                this.logined_person_index = this.getPersonIndexByEmail(email)
                this.logined_person_id = this.person[this.logined_person_index].id
                this.getCurrentPerson.logined = true

                return true
            }

            return false
        },
    },
})
