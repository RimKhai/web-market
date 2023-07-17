import React from "react"
import UIInput from "../ui_kit/ui_input/UIInput"
import UIBlock from "../ui_kit/ui_block/UIBlock"
import UIButton from "../ui_kit/ui_button/UIButton"
import { NavLink } from "react-router-dom"

const Authorization: React.FunctionComponent = () => {
    return (
        <div className='flex justify-center items-center'>
            <UIBlock styles='w-[33%] mt-16'>
                <div className='flex place-self-center text-3xl mb-4'>
                    Вход в личный аккаунт
                </div>
                <UIInput label='E-mail' />
                <UIInput label='Пароль' />
                <UIButton>Войти</UIButton>
                <NavLink className='flex place-self-end text-blue-500 underline'  to={"/reg"}>Нет Аккаунт? Создать!</NavLink>
            </UIBlock>
        </div>
    )
}

export default Authorization
