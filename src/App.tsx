import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Authorization from "./widgets/Authorization"
import Registration from "./widgets/Registration"
import ProductListPage from "./pages/product_list_page/ProductListPage"

const router = createBrowserRouter([
  {
    path:"/products",
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
