import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        // список всех категорий
        categories: [
            {
                id: 0,
                title: 'Все Категории',
                description: 'Описание',
                path: 'all',
            },
            {
                id: 1,
                title: 'Смартфоны',
                description: 'Описание',
                products: [1, 2, 3],
                path: 'phones',
            },
            {
                id: 2,
                title: 'Aудиотехника',
                description: 'Описание',
                products: [4, 5, 6, 13, 14, 15],
                path: 'audios',
            },
            {
                id: 3,
                title: 'Сопутствующие товары',
                description: 'Описание',
                products: [7, 8, 9, 4, 5, 6],
                path: 'related',
            },
            {
                id: 4,
                title: 'Наушники',
                description: 'Описание',
                products: [4, 5, 6],
                path: 'ears',
            },
            {
                id: 5,
                title: 'Чехлы',
                description: 'Описание',
                products: [7, 8, 9],
                path: 'covers',
            },
            {
                id: 6,
                title: 'Портативные колонки',
                description: 'Описание',
                products: [13, 14, 15],
                path: 'portable_speakers',
            },
        ],

        //дерево категорий, сделано для отрисовки вложенного списка неизвестной глубины

        categoriesTree: [
            {
                id: 1,
                title: 'Смартфоны',
                description: 'Описание',
                subcategories: [
                    {
                        id: 3,
                        title: 'Сопутствующие товары',
                        description: 'Описание',
                        path: 'phones/related',
                        subcategories: [
                            {
                                id: 4,
                                title: 'Наушники',
                                description: 'Описание',
                                path: 'phones/related/ears',
                                subcategories: [],
                            },
                            {
                                id: 5,
                                title: 'Чехлы',
                                description: 'Описание',
                                path: 'phones/related/covers',
                            },
                        ],
                    },
                ],
                path: 'phones',
            },
            {
                id: 2,
                title: 'Aудиотехника',
                description: 'Описание',
                subcategories: [
                    {
                        id: 4,
                        title: 'Наушники',
                        description: 'Описание',
                        path: 'audios/ears',
                        subcategories: [],
                    },
                    {
                        id: 6,
                        title: 'Портативные колонки',
                        description: 'Описание',
                        path: 'audios/portable_speakers',
                        subcategories: [],
                    },
                ],
                path: 'audios',
            },
            {
                id: 4,
                title: 'Наушники',
                description: 'Описание',
                path: 'ears',
            },
        ],
    }),

    getters: {
        // в случае отсутствия совпаденйи функции возвращают -1

        getCategoryById: (state) => {
            return (category_id) =>
                state.categories.find((item) => item.id == category_id) ?? -1
        },

        getCategoryByTitle: (state) => {
            return (title) =>
                state.categories.find((item) => item.title == title) ?? -1
        },

        getCategoryByPath: (state) => {
            return (path) =>
                state.categories.find((item) => item.path == path) ?? -1
        },

        getAllByPath: (state) => {
            return (path) =>
                state.categories.filter((item) => item.path == path)
        },
    },
})
