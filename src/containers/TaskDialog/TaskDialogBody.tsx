import React, {useEffect} from 'react'
import { useAppSelector } from '@src/store/hooks'
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
import CenteredLoader from '@src/components/modules/CenteredLoader'
import { 
    createTask,
    getTask,
    updateTask
} from '@src/endpoints/task'
import type {
    taskInterface,
    createTaskDataInterface,
    getTaskArgsInterface,
    updateTaskInterface
} from '@src/endpoints/task/types.ts'
import useQuery from '@src/hooks/useQuery'
import { errorMessage } from '@src/constants'
import type { tValidationObj, tFormCtrlValues } from '@src/hooks/useFormCtrl.tsx'
import { 
    getBoardState,
    getBoardStatusList 
} from "@src/store/selectors/boardSelectors"

interface TaskDialogBodyProps {
    handleClose: () => void,
    refresh: () => void,
    taskId?: string
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

const TaskDialogBody = ({ handleClose, refresh, taskId }: TaskDialogBodyProps) => {
    const {enqueueSnackbar} = useSnackbar()
    const boardData = useAppSelector(getBoardState)
    const statusList = useAppSelector(state => getBoardStatusList(state))
    const { loading, call: createTaskCall } = useQuery<taskInterface, createTaskDataInterface>({fetchFunc: createTask})
    const { loading: loadingUpdate, call: updateTaskCall } = useQuery<null, updateTaskInterface>({ fetchFunc: updateTask })
    const { loading: loadingTask, call: getTaskCall, result: taskData } = useQuery<taskInterface, getTaskArgsInterface>({ fetchFunc: getTask, loading: !!taskId  })
    const loadingData = loadingUpdate || loading

    const formCtrl = useFormCtrl({
        initialValues: {
            title: "",
            description: "",
            status: statusList ? statusList[0].value : "",
            boardId: boardData?._id || ""
        },
        validate
    })

    useEffect(() => {
        if (taskId){
            getTaskCall(taskId)
            .then(json => {
                formCtrl.setValues({
                    ...formCtrl.values,
                    title: json.title || "",
                    description: json.description || "",
                    status: json.status || "",
                })
            })
            .catch(e => {
                enqueueSnackbar(errorMessage, { variant: "error" })
            })
        }
    }, [taskId])

    const handleCreateTask = () => {
        if (!loading && formCtrl.isValidatedForm()) {
            createTaskCall(formCtrl.values)
                .then(() => {
                    handleClose()
                    refresh()
                })
                .catch(e => {
                    enqueueSnackbar(errorMessage, { variant: "error" })
                })
        }
    }

    const handleUpdateTask = () => {
        if (!loadingUpdate && formCtrl.isValidatedForm() && taskId) {
            updateTaskCall({...formCtrl.values, _id: taskId})
                .then(() => {
                    handleClose()
                    refresh()
                })
                .catch(e => {
                    enqueueSnackbar(errorMessage, { variant: "error" })
                })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // if task exists update task and board
        // else create task
        if (taskId){
            handleUpdateTask()
        } else {
            handleCreateTask()
        }
    }

    const buildOptions = (statusList?: { displayName: string, value: string }[]) => {
        if (!statusList) return null
        return statusList.map(item => (<MenuItem key={item.value} value={item.value}>{item.displayName}</MenuItem>))
    }    

    return (
        <>
            {
                loadingTask ? 
                <CenteredLoader minHeight='500px' />
                :
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
                                    {buildOptions(statusList)}
                                </SelectFormCtrl>
                            </Grid>
                        </Grid>
                    </Box>
                    <SectionActions 
                        leftActions={
                            <Button 
                                variant='outlined' 
                                onClick={handleClose}
                                disabled={loadingData}
                            >Cancel</Button>
                        }
                        rightActions={
                            <LoadStateButton
                                loading={loadingData}
                                variant='contained'
                                type="submit"
                                disabled={loadingData}
                            >Save</LoadStateButton>
                        }
                    />
                </form>
            }
        </>
    )
}

export default TaskDialogBody