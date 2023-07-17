import React from "react"
import NavigationBar from "../../widgets/NavigationBar"
import ProductCard from "../../widgets/product_card/ProductCard"

const ProductListPage = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <NavigationBar />
            {[0,1,2,3].map(item => <ProductCard
                image_path='https://f1comp.ru/wp-content/uploads/2020/05/XiaomiMiA3.jpg'
                name='Samsung A10'
                description="Какое-то очень крутое описание смартфона до 255 символов"
                status={11}
                price="110 000"
            />)}
        </div>
    )
}

export default ProductListPage
