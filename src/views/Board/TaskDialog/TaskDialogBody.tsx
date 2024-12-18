import React from 'react'
import {    
    Box,
    Grid2 as Grid,
    Typography,
    Button,
    MenuItem
} from '@mui/material'
import { useSnackbar } from 'notistack'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import useFormCtrl from '@src/hooks/useFormCtrl'
import SectionActions from '@src/components/modules/SectionActions'
import LoadStateButton from '@src/components/controls/LoadStateButton'
import SelectFormCtrl from '@src/components/controls/SelectFormCtrl'
import { createTask } from '@src/endpoints/task'
import type {
    taskInterface,
    createTaskDataInterface
} from '@src/endpoints/task/types.ts'
import useQuery from '@src/hooks/useQuery'
import { errorMessage } from '@src/constants'
import type { tValidationObj, tFormCtrlValues } from '@src/hooks/useFormCtrl.tsx'

interface TaskDialogBodyProps {
    handleClose: () => void,
    statusList?: { displayName: string, value: string }[],
    boardId?: string,
    refresh: () => void
}

const validate = (values: tFormCtrlValues, _: tFormCtrlValues) => {
    const errors: tValidationObj = {}

    Object.entries(values).forEach(([key, value]) => {
        if (!value && key !== "description") {
            errors[key] = true
        }
    })

    return errors
}

const TaskDialogBody = ({ handleClose, statusList, boardId, refresh }: TaskDialogBodyProps) => {
    const { loading, call: createTaskCall } = useQuery<taskInterface, createTaskDataInterface>({fetchFunc: createTask})
    const {enqueueSnackbar} = useSnackbar()

    const formCtrl = useFormCtrl({
        initialValues: {
            title: "",
            description: "",
            status: statusList ? statusList[0].value : "",
            boardId: boardId || ""
        },
        validate
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!loading && formCtrl.isValidatedForm()){
            createTaskCall(formCtrl.values)
            .then(() => {
                handleClose()
                refresh()
            })
            .catch(e => {
                enqueueSnackbar(errorMessage, {variant: "error"})
            })
        }
    }

    const buildOptions = () => {
        if (!statusList) return null
        return statusList.map(item => (<MenuItem key={item.value} value={item.value}>{item.displayName}</MenuItem>))
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Box p={4}>
                <Grid container spacing={4}>
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
                        <SelectFormCtrl 
                            formCtrl={formCtrl}
                            label="Status"
                            name="status"                            
                        >
                            {buildOptions()}
                        </SelectFormCtrl>
                    </Grid>
                </Grid>
            </Box>
            <SectionActions 
                leftActions={
                    <Button 
                        variant='outlined' 
                        onClick={handleClose}
                        disabled={loading}
                    >Cancel</Button>
                }
                rightActions={
                    <LoadStateButton
                        loading={loading}
                        variant='contained'
                        type="submit"
                        disabled={loading}
                    >Save</LoadStateButton>
                }
            />
        </form>
    )
}

export default TaskDialogBody