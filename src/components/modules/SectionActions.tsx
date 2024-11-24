import React, { JSXElementConstructor, ReactElement, ReactHTMLElement, ReactNode } from 'react'
import styled from 'styled-components'

interface SectionActionsProps {
    className?: string, 
    leftActions?: ReactNode, 
    rightActions?: ReactNode
}

const LeftActions = styled.div`
    display: inline-flex;
    > button,
    > div, 
    > a {
        margin-right: 16px;
        &:last-child {
            margin-right: 0;
        }
    }
`

const RightActions = styled(LeftActions)`

`

const SectionActionBase = styled.div`
    border-top: 1px solid ${({ theme }) => theme.palette.mode === "dark" ? "#555" : "#bbb"};;
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
`

const SectionActions = ({ leftActions, rightActions }: SectionActionsProps) => {

    const displayActions = (actions: ReactNode, ActionsContainer: JSX.ElementType) => {
        return <ActionsContainer>{actions}</ActionsContainer>
    }

    return (
        <SectionActionBase>
            {displayActions(leftActions, LeftActions)}
            {displayActions(rightActions, RightActions)}
        </SectionActionBase>
    )
}

export default SectionActions