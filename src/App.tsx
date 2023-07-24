import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Authorization from "./widgets/Authorization"
import Registration from "./widgets/Registration"
import ProductListPage from "./pages/product_list_page/ProductListPage"
import CategoriesListPage from "./pages/categories_list_page/CategoriesListPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CategoriesListPage/>
  },
  {
    path: "/products",
    element: <ProductListPage/>
  },
  {
    path: "/auth",
    element: <Authorization/>
  },
  {
    path: "/reg",
    element: <Registration/>
  }
])

function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
