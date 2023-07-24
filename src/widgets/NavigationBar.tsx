import React from "react"
import UIIcon from "../ui_kit/ui_icon/UIIcon"
import ProfileNavButton from "../entites/profile_nav_button/ProfileNavButton"
import ShoppingCartButton from "../entites/shopping_cart_button/ShoppingCartButton"
import { NavLink } from "react-router-dom"

const NavigationBar: React.FunctionComponent = () => {
    return (
        <div className='w-full h-16 bg-red-500 flex items-center justify-between px-8'>
            <NavLink to={'/'}>
                <div className='text-white text-2xl h-8'>КАТАЛОГ</div>
            </NavLink>
            <div className='flex space-x-8'>
                <ProfileNavButton />
                <ShoppingCartButton />
            </div>
        </div>
    )
}

export default NavigationBar
