import React from "react"
import NavigationBar from "./widgets/NavigationBar"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Authorization from "./widgets/Authorization"
import Registration from "./widgets/Registration"

const router = createBrowserRouter([
  {
    path:"/",
    element: <NavigationBar/>
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
