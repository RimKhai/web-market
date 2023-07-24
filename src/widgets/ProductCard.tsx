import React from "react"
import UIBlock from "../ui_kit/ui_block/UIBlock"
import UIButton from "../ui_kit/ui_button/UIButton"


interface ProductCardProps {
    image_path: string,
    name: string,
    description: string,
    status: number,
    price: string
}

const ProductCard: React.FunctionComponent<ProductCardProps> = ({image_path, name, description, status, price}) => {
    return (
        <UIBlock styles="w-[67%] p-8">
            <div className='flex justify-between'>
                <img src={image_path} className='h-48'/>
                <div className='flex flex-col'>
                    <div className='text-3xl text-green-500'>
                        {name}
                    </div>
                    <div className='mt-8'>
                        {description}
                    </div>
                </div>
                <div className={(status > 10) ? 'text-green-500 mt-8' : 'text-red-500 mt-8'}>{(status > 10) ? 'В наличии' : 'Мало'}</div>
                <div className='flex flex-col space-y-3 items-center mt-6'>
                    <div>{price} ₽</div>
                    <UIButton>В корзину</UIButton>
                </div>
            </div>
        </UIBlock>
    )
}

export default ProductCard