import React from "react"
import CategoriesCard from "../../widgets/CategoriesCard"
import NavigationBar from "../../widgets/NavigationBar"

const CategoriesListPage = () => {
    return (
        <div className='flex flex-col items-center space-y-2'>
            <NavigationBar />
            <CategoriesCard
                image_path='https://img.mvideo.ru/Pdb/30041492b.jpg'
                label='Смартфоны'
                link_path={'/products'}
            />
            <CategoriesCard
                image_path='https://dmtrpedals.ru/wp-content/uploads/2021/05/yerasov-bluespace-g12m-2.jpg'
                label='Аудиотехника'
                link_path={'/products'}
            />
        </div>
    )
}

export default CategoriesListPage
