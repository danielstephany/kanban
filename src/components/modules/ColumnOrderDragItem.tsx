import React, { forwardRef } from 'react'
import { Paper } from "@mui/material"
import type {
    PaperProps
} from "@mui/material"
import styled from 'styled-components'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const DragItemBase = styled.div`
    padding: 8px 0;
`

const DragItemContent = styled(Paper) <{ $isDragging?: boolean }>`
    display: flex; 
    align-items: stretch;
    background-color: transparent;
    overflow: hidden;
    ${({ theme, $isDragging }) => $isDragging ? "background: " + theme.palette.primary.light : ""};
    ${({ theme, $isDragging }) => $isDragging ? "color: " + theme.palette.primary.contrastText : ""};
`
const DragInputContainer = styled.div`
    flex-grow: 1;
    padding: 12px 8px 12px 16px;
`

const DragIconContainer = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.palette.primary.light};
`

interface DragItemProps extends PaperProps {
    children: React.ReactNode,
    isDragging?: boolean
}

export type Ref = HTMLDivElement;

const ColumnOrderDragItem = forwardRef<Ref, DragItemProps>(({ isDragging, children, ...others }, ref) => {
    return (
        <DragItemBase {...others} ref={ref}>
            <DragItemContent $isDragging={isDragging} variant='outlined'>
                <DragInputContainer>
                    {children}
                </DragInputContainer>
                <DragIconContainer>
                    <DragIndicatorIcon fontSize="medium" />
                </DragIconContainer>
            </DragItemContent>
        </DragItemBase>
    )
})

export default ColumnOrderDragItem