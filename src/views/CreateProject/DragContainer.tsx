import React, {forwardRef} from 'react'
import styled from 'styled-components'

const DropContainerBase = styled.div<{ $isDraggingOver?: boolean }>`
    border-radius: 4px;    
    overflow: hidden;    
`
const DropContainerContent = styled.div<{ $isDraggingOver?: boolean }>`
    flex-grow: 1;
    min-height: 200px;
    transition: background-color 0.2s ease;
    background-color: ${({ theme, $isDraggingOver }) => $isDraggingOver ? (theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)") : "transparent"};
    max-height: 100%;
    overflow: auto;
    margin: -8px 0;

`
type DivRef = HTMLDivElement

interface DropContainerProps {
    children: React.ReactNode
    isDraggingOver?: boolean
}

const DropContainer = forwardRef<DivRef, DropContainerProps>(({ isDraggingOver, children, ...others}: DropContainerProps, ref) => {
    return (
        <DropContainerBase {...others}>
            <DropContainerContent $isDraggingOver={isDraggingOver} ref={ref}>
                {children}
            </DropContainerContent>
        </DropContainerBase>
    )
})

export default DropContainer