import React, { forwardRef } from 'react'
import { 
    Paper,
    IconButton
} from "@mui/material"
import type {
    PaperProps
} from "@mui/material"
import {Trash} from 'react-feather'
import styled from 'styled-components'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const DragItemBase = styled.div`
    padding: 8px 0;
    margin: 0 4px;
    flex-grow: 1;
`

const DragItemContent = styled(Paper) <{ $isDragging?: boolean }>`
    display: flex; 
    flex-direction: column;
    align-items: stretch;
    background-color: transparent;
    overflow: hidden;
    ${({ theme, $isDragging }) => $isDragging ? "background: " + theme.palette.primary.light : ""};
    ${({ theme, $isDragging }) => $isDragging ? "color: " + theme.palette.primary.contrastText : ""};
`
const DragInputContainer = styled.div`
    flex-grow: 1;
    padding: 12px 8px 12px 8px;
`

const DragIconContainer = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.palette.primary.light};
`

interface DragItemProps extends PaperProps {
    children: React.ReactNode,
    isDragging?: boolean,
    handleDelete?: () => void
}

export type Ref = HTMLDivElement;

const ColumnOrderDragItem = forwardRef<Ref, DragItemProps>(({ 
    isDragging, 
    children, 
    handleDelete, 
    ...others 
}, ref) => {
    return (
        <DragItemBase {...others} ref={ref}>
            <DragItemContent $isDragging={isDragging} variant='outlined'>
                <DragIconContainer>
                    <DragIndicatorIcon fontSize="medium" />
                    {handleDelete ? <IconButton onClick={handleDelete}><Trash size={18}/></IconButton>: null}
                </DragIconContainer>
                <DragInputContainer>
                    {children}
                </DragInputContainer>
            </DragItemContent>
        </DragItemBase>
    )
})

export default ColumnOrderDragItem