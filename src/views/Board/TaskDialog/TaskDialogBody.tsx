import React from 'react'
import {
    Dialog,
    Paper,
    Box,
    Grid2 as Grid,
    Typography
} from '@mui/material'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import useFormCtrl from '@src/hooks/useFormCtrl'

interface TaskDialogBodyProps {
    
}

const TaskDialogBody = ({  }: TaskDialogBodyProps) => {

    return (
        <Box p={4}>
            <Grid container>
                <Grid size={12}>
                    <Typography>Create Task</Typography>
                </Grid>
                <Grid size={12}>

                </Grid>
                <Grid size={12}>

                </Grid>
            </Grid>
        </Box>
    )
}

export default TaskDialogBody