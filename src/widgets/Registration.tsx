import React from "react"
import UIInput from "../ui_kit/ui_input/UIInput"
import UIBlock from "../ui_kit/ui_block/UIBlock"
import UIButton from "../ui_kit/ui_button/UIButton"
import { NavLink } from "react-router-dom"

const Registration: React.FunctionComponent = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <UIBlock styles='w-[33%] mt-16'>
                <div className='flex place-self-center text-3xl mb-4'>
                    Регистрация
                </div>
                <div className='flex space-x-2'>
                    <UIInput label='Имя' />
                    <UIInput label='Фамилия' />
                </div>
                <UIInput label='E-mail' />
                <UIInput label='Пароль' />
                <UIButton>Зарегистрироваться</UIButton>
                <NavLink className='flex place-self-end text-blue-500 underline'  to={"/auth"}>Уже есть аккаунт</NavLink>
            </UIBlock>
            <NavLink className='p-4 w-[33%] text-center bg-white rounded-[20px] hover:text-white hover:bg-red-600 duration-1000 mt-16'  to={"/"}>Перейти в каталог</NavLink>
        </div>
    )
}

export default Registration
