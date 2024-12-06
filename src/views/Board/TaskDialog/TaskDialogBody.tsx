import React from 'react'
import {    
    Box,
    Grid2 as Grid,
    Typography,
    Button,
} from '@mui/material'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import useFormCtrl from '@src/hooks/useFormCtrl'
import SectionActions from '@src/components/modules/SectionActions'
import LoadStateButton from '@src/components/controls/LoadStateButton'

interface TaskDialogBodyProps {
    handleClose: () => void
}

const TaskDialogBody = ({ handleClose }: TaskDialogBodyProps) => {
    const formCtrl = useFormCtrl({
        initialValues: {
            title: "",
            description: ""
        }
    })
    return (
        <>
            <Box p={4}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Typography variant='h3'>Create Task</Typography>
                    </Grid>
                    <Grid size={12}>
                        <TextFieldFormCtrl 
                            formCtrl={formCtrl}
                            label="Task Title"
                            name="title"
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextFieldFormCtrl 
                            formCtrl={formCtrl}
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextFieldFormCtrl 
                            formCtrl={formCtrl}
                            label="Status"
                            name="status"
                        />
                    </Grid>
                </Grid>
            </Box>
            <SectionActions 
                leftActions={
                    <Button 
                        variant='outlined' 
                        onClick={handleClose}
                    >Cancel</Button>
                }
                rightActions={
                    <LoadStateButton
                        loading={false}
                        variant='contained'
                    >Save</LoadStateButton>
                }
            />
        </>
    )
}

export default TaskDialogBody