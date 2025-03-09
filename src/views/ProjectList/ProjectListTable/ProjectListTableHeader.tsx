import React from 'react'

import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel
} from '@mui/material'

type tableHeadDataType = Array<{
    label: string,
    id?: string,
    align?: "center" | "left" | "right"
}>

interface projectListTableHeaderProps {
    tableHeadData: tableHeadDataType
    orderBy?: string,
    isAsc: boolean,
    handleSort: (e: React.MouseEvent<unknown>, colId: string) => void
}


export default function ProjectListTableHeader({ tableHeadData, orderBy, isAsc, handleSort }: projectListTableHeaderProps){

    const handleSortUpdate = (colId: string) => (e: React.MouseEvent<unknown>) => {
        handleSort(e, colId)
    }

    const buildHeaderCells = (tableHeadData: tableHeadDataType) => {
        if (tableHeadData){
           return tableHeadData.map(cell => {
               const isActiveCell = cell.id === orderBy
               return (
                <TableCell
                    key={cell.id || cell.label}
                    align={cell?.align || "left"}
                >
                    {
                        cell.id ? 
                            <TableSortLabel
                                active={cell.id === orderBy}
                                direction={isActiveCell ? (isAsc ? "asc" : "desc") : "asc"}
                                onClick={handleSortUpdate(cell.id)}
                            >
                                {cell.label}
                            </TableSortLabel>
                        :
                            cell.label
                    }
                </TableCell>
               )
           })
        }
        return null
    }

    return (
        <TableHead>
            <TableRow>
                {buildHeaderCells(tableHeadData)}
            </TableRow>
        </TableHead>
    )
}