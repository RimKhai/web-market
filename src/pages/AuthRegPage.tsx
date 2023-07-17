import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Authorization from "../widgets/Authorization"
import Registration from "../widgets/Registration"

const router = createBrowserRouter([
    {
      path:"/",
      element: <Authorization/>
    },
    {
      path: "/reg",
      element: <Registration/>
    }
  ])

const AuthRegPage: React.FunctionComponent = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AuthRegPage
