import React from "react"
import UIInput from "../ui_kit/ui_input/UIInput"
import UIBlock from "../ui_kit/ui_block/UIBlock"
import UIButton from "../ui_kit/ui_button/UIButton"
import { NavLink } from "react-router-dom"

const Authorization: React.FunctionComponent = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <UIBlock styles='w-[33%] mt-16'>
                <div className='flex place-self-center text-3xl mb-4'>
                    Вход в личный аккаунт
                </div>
                <UIInput label='E-mail' />
                <UIInput label='Пароль' />
                <UIButton>Войти</UIButton>
                <NavLink className='flex place-self-end text-blue-500 underline'  to={"/reg"}>Нет Аккаунт? Создать!</NavLink>
            </UIBlock>
            <NavLink className='p-4 w-[33%] text-center bg-white rounded-[20px] hover:text-white hover:bg-red-600 duration-1000 mt-16'  to={"/"}>Перейти в каталог</NavLink>
        </div>
    )
}

export default Authorization
