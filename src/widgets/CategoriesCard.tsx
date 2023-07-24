import React, { AnchorHTMLAttributes, RefAttributes } from "react"
import UIBlock from "../ui_kit/ui_block/UIBlock"
import { NavLink } from "react-router-dom"

interface CategoriesCardProps {
    image_path: string
    label: string
    link_path?: string
}

const CategoriesCard: React.FunctionComponent<CategoriesCardProps> = ({
    image_path,
    label,
    link_path,
}) => {
    return (
        <UIBlock styles='w-[67%] p-4 cursor-pointer hover:bg-gray-100'>
            <NavLink to={{ pathname: link_path }}>
                <div className='flex w-full'>
                    <img
                        src={image_path}
                        className='h-32'
                    />
                    <div className='place-self-center text-center  w-full text-4xl'>
                        {label}
                    </div>
                </div>
            </NavLink>
        </UIBlock>
    )
}

export default CategoriesCard
