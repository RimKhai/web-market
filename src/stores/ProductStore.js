import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [
            {
                id: 1,
                name: 'BApple Pro Max',
                description: 'description',
                quantity: 4,
                price: 120000,
                totalRating: 2,
                imageName: 'b_apple_pro_max',
                parameters: {
                    'Бренд': 'Apple',
                    'Модель': 'Pro Max',
                    'Год Релиза': '2022',
                    'Цвет': 'Черный',
                    'Количество SIM': '2',
                    'Оперативная память': '32 Гб',
                    'Объем встроенной памяти': '128 Гб',
                    'Экран': '6.5"',
                    'Разрешение Экрана': '1600x720',
                    'Частота обновления экрана': '60 Гц',
                    'Тип корпуса': 'Стекло',
                    'Модель процессора': 'Spreadtrum SC9863A',
                    'Количество Ядер': '8',
                    'Тактовая частота': '2.0 GHz',
                    'Емкость Аккумулятора': '5000 mA*h'
                }
            },
            {
                id: 2,
                name: 'Samsung A52',
                description: 'description',
                quantity: 6,
                price: 100000,
                totalRating: 3,
                imageName: 'samsung_a52',
                parameters: {
                    'Бренд': 'Samsung',
                    'Модель': 'A52',
                    'Год Релиза': '2022',
                    'Цвет': 'Черный',
                    'Количество SIM': '2',
                    'Оперативная память': '32 Гб',
                    'Объем встроенной памяти': '128 Гб',
                    'Экран': '6.5"',
                    'Разрешение Экрана': '1600x720',
                    'Частота обновления экрана': '60 Гц',
                    'Тип корпуса': 'Стекло',
                    'Модель процессора': 'Spreadtrum SC9863A',
                    'Количество Ядер': '8',
                    'Тактовая частота': '2.0 GHz',
                    'Емкость Аккумулятора': '5000 mA*h'
                }
            },
            {
                id: 3,
                name: 'Apple Pro Max',
                description: 'description',
                quantity: 2,
                price: 110000,
                totalRating: 4,
                imageName: 'apple_pro_max',
                parameters: {
                    'Бренд': 'Apple',
                    'Модель': 'Pro Max',
                    'Год Релиза': '2022',
                    'Цвет': 'Черный',
                    'Количество SIM': '2',
                    'Оперативная память': '32 Гб',
                    'Объем встроенной памяти': '128 Гб',
                    'Экран': '6.5"',
                    'Разрешение Экрана': '1600x720',
                    'Частота обновления экрана': '60 Гц',
                    'Тип корпуса': 'Стекло',
                    'Модель процессора': 'Spreadtrum SC9863A',
                    'Количество Ядер': '8',
                    'Тактовая частота': '2.0 GHz',
                    'Емкость Аккумулятора': '5000 mA*h'
                }
            },
            {
                id: 4,
                name: 'Hyper-X Ears 1',
                description: 'description',
                quantity: 4,
                price: 12000,
                totalRating: 1.8,
                imageName: 'hyperx_ears',
                parameters: {
                    'Бренд': 'Hyper-X',
                    'Модель': 'Ears 1',
                    'Тип конструкции': 'Накладные',
                    'Цвет': 'Черный',
                    'Звуковая схема': '2.0',
                    'Минимальная частота воспроизведения': '10 Гц',
                    'Максимальная частота воспроизведения': '28000 Гц',
                    'Чувствительность': '100 дБ',
                    'Разъем': 'jack 3.5',
                    'Длина кабеля': '2 м',
                    'Вес': '490 г'
                }
            },
            {
                id: 5,
                name: 'Marshall Major 5',
                description: 'description',
                quantity: 3.6,
                price: 16000,
                totalRating: 3,
                imageName: 'marshall',
                parameters: {
                    'Бренд': 'Senheizer',
                    'Модель': 'Ears 1',
                    'Тип конструкции': 'Накладные',
                    'Цвет': 'Черный',
                    'Звуковая схема': '2.0',
                    'Минимальная частота воспроизведения': '10 Гц',
                    'Максимальная частота воспроизведения': '28000 Гц',
                    'Чувствительность': '100 дБ',
                    'Разъем': 'jack 3.5',
                    'Длина кабеля': '2 м',
                    'Вес': '590 г'
                }
            },
            {
                id: 6,
                name: 'Razer Ears',
                description: 'description',
                quantity: 2,
                price: 11000,
                totalRating: 3,
                imageName: 'razer_ears',
                parameters: {
                    'Бренд': 'Hyper-X',
                    'Модель': 'Ears 1',
                    'Тип конструкции': 'Накладные',
                    'Цвет': 'Черный',
                    'Звуковая схема': '2.0',
                    'Минимальная частота воспроизведения': '10 Гц',
                    'Максимальная частота воспроизведения': '28000 Гц',
                    'Чувствительность': '100 дБ',
                    'Разъем': 'jack 3.5',
                    'Длина кабеля': '2 м',
                    'Вес': '490 г'
                }
            },
            {
                id: 7,
                name: 'Chahol black',
                description: 'description',
                quantity: 4,
                price: 120,
                totalRating: 3,
                imageName: 'chahol_black',
                parameters: {
                    'Бренд': 'Chahol',
                    'Модель телефона': 'Apple',
                    'Материал': 'Полипропилен',
                    'Цвет': 'Черный'
                }
            },
            {
                id: 8,
                name: 'Chahol blue',
                description: 'description',
                quantity: 6,
                price: 100,
                totalRating: 3,
                imageName: 'chahol_blue',
                parameters: {
                    'Бренд': 'Chahol',
                    'Модель телефона': 'Apple',
                    'Материал': 'Полипропилен',
                    'Цвет': 'Белый'
                }
            },
            {
                id: 9,
                name: 'Chahol red',
                description: 'description',
                quantity: 2,
                price: 110,
                totalRating: 3,
                imageName: 'chahol_red',
                parameters: {
                    'Бренд': 'Chahol',
                    'Модель телефона': 'Apple',
                    'Материал': 'Полипропилен',
                    'Цвет': 'Красный'
                }
            },
            {
                id: 10,
                name: 'PowerBank Apply',
                description: 'description',
                quantity: 4,
                price: 1200,
                totalRating: 3,
                imageName: 'powerbank_1',
                parameters: {
                    'Бренд': 'PowerBank',
                    'Модель': 'Apply',
                    'Тип аккумулятора': 'Li-pol',
                    'Ёмкость аккумулятора': '20000 mA*h',
                    'Маскимальный выходной ток': '2.4 A',
                    'Количество выходных разъемов': '2 шт'
                }
            },
            {
                id: 11,
                name: 'Magnet Charge',
                description: 'description',
                quantity: 6,
                price: 1000,
                totalRating: 3,
                imageName: 'powerbank_2',
                parameters: {
                    'Бренд': 'Magnet',
                    'Модель': 'Charge',
                    'Тип аккумулятора': 'Li-pol',
                    'Ёмкость аккумулятора': '22000 mA*h',
                    'Маскимальный выходной ток': '2.4 A',
                    'Количество выходных разъемов': '2 шт'
                }
            },
            {
                id: 12,
                name: 'Electric Charge',
                description: 'description',
                quantity: 2,
                price: 1100,
                totalRating: 3,
                imageName: 'powerbank_3',
                parameters: {
                    'Бренд': 'Electric',
                    'Модель': 'Charge',
                    'Тип аккумулятора': 'Li-pol',
                    'Ёмкость аккумулятора': '15000 mA*h',
                    'Маскимальный выходной ток': '2.4 A',
                    'Количество выходных разъемов': '2 шт'
                }
            },
            {
                id: 13,
                name: 'JBL UltraBass',
                description: 'description',
                quantity: 4,
                price: 12300,
                totalRating: 3,
                imageName: 'portable_1',
                parameters: {
                    'Бренд': 'JBL',
                    'Модель': 'UltraBass',
                    'Основной цвет': 'Черный',
                    Стереосистема: 'есть',
                    Мощность: '240 Вт',
                    'Минимальная частота воспроизведения': '10 Гц',
                    'Максимальная частота воспроизведения': '28000 Гц'
                }
            },
            {
                id: 14,
                name: 'JBL Storm',
                description: 'description',
                quantity: 6,
                price: 10010,
                totalRating: 3,
                imageName: 'portable_2',
                parameters: {
                    'Бренд': 'JBL',
                    'Модель': 'Storm',
                    'Основной цвет': 'Синий',
                    Стереосистема: 'есть',
                    Мощность: '240 Вт',
                    'Минимальная частота воспроизведения': '10 Гц',
                    'Максимальная частота воспроизведения': '28000 Гц'
                }
            },
            {
                id: 15,
                name: 'JBL Clear Sound',
                description: 'description',
                quantity: 2,
                price: 11020,
                totalRating: 3,
                imageName: 'portable_3',
                parameters: {
                    'Бренд': 'JBL',
                    'Модель': 'Clear Sound',
                    'Основной цвет': 'Белый',
                    'Стереосистема': 'есть',
                    'Мощность': '240 Вт',
                    'Минимальная частота воспроизведения': '10 Гц',
                    'Максимальная частота воспроизведения': '28000 Гц'
                }
            }
        ]
    }),

    getters: {
        getProductById: (state) => {
            return (product_id) => state.products.find((item) => item.id == product_id)
        }
    },

    actions: {
        sortBy(sortType) {
            switch (sortType) {
                case 'byId':
                    this.products.sort((a, b) => a.id - b.id)
                    break
                case 'alphabetical':
                    this.products.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case 'priceLow':
                    this.products.sort((a, b) => a.price - b.price)
                    break
                case 'priceHigh':
                    this.products.sort((a, b) => b.price - a.price)
                    break
                case 'rating':
                    this.products.sort((a, b) => a.totalRating - b.totalRating)
                    break
            }
        }
    }
})
