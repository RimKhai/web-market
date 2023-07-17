import React from "react"
import { UIButtonStyles } from "./styles"
import Button from "@mui/material/Button"

interface UIButtonProps {
    width?: string
    height?: string
    children?: string
    action?: () => void
}

const UIButton: React.FunctionComponent<UIButtonProps> = ({
    width,
    height,
    children,
    action,
}) => {
    return (
        <Button
            variant='contained'
            onClick={action}
            sx={{...UIButtonStyles, width: width, height: height}}>
            <p>{children}</p>
        </Button>
    )
}

export default UIButton
