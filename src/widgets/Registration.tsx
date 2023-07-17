import React from "react"
import UIInput from "../ui_kit/ui_input/UIInput"
import UIBlock from "../ui_kit/ui_block/UIBlock"
import UIButton from "../ui_kit/ui_button/UIButton"

const Registration: React.FunctionComponent = () => {
    return (
        <div>
            <div className='flex justify-center items-center'>
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
                </UIBlock>
            </div>
        </div>
    )
}

export default Registration
