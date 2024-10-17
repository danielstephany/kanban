import React from "react"
import {Button} from "@mui/material"
import styled, { keyframes } from 'styled-components'
import { RotateCw } from "react-feather"
import type {
    ButtonProps
} from "@mui/material"

type iconColorType = {light: string, dark: string}

interface LoadStateButtonProps extends ButtonProps {
    loading?: boolean,
    iconColor?: iconColorType
}

interface getIconColorProps extends ButtonProps {
    theme: { palette?: { mode?: "light" | "dark" } },
    iconColor?: iconColorType
}

const iconRotate = keyframes`
    from { transform: rotate(0deg)  }
    to { transform: rotate(360deg)  }
`
const getIconColor = ({ iconColor, theme }: getIconColorProps) => {
    if(!iconColor) return ""

    const mode = theme.palette?.mode || "light"
    return `color: ${iconColor ? iconColor[mode] : "#000"};`
}

const LoadStateButtonIconContainer = styled.span<{ iconColor?: { light: string, dark: string }; }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({ iconColor, theme }) => getIconColor({ iconColor, theme }) }
    > svg {
        transform-origin: center;
        animation: ${iconRotate} 2s linear infinite; 
    }
`

const LoadStateButtonWrapper = styled.div`
    display: inline-flex;
    position: relative;
`

const LoadStateButton = ({ loading, iconColor, ...others }: LoadStateButtonProps) => {
    return (
        <LoadStateButtonWrapper>
            <Button
                {...others}
            />
            {
                loading ?
                <LoadStateButtonIconContainer iconColor={iconColor}>
                    <RotateCw />
                </LoadStateButtonIconContainer>
                : null
            }
        </LoadStateButtonWrapper>
    )
}

export default LoadStateButton