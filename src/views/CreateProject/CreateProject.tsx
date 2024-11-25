import React, {useRef} from 'react'
import Helmet from 'react-helmet'
import { useSnackbar } from 'notistack'
import {
    Typography,
    Box,
    Card,
    Grid2 as Grid,
    Button,
    InputAdornment,
    IconButton
} from "@mui/material"
import SectionHeader from '@src/components/modules/SectionHeader'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import useFormControl from '@src/hooks/useFormCtrl'
import LoadStateButton from '@src/components/controls/LoadStateButton'
import SectionActions from '@src/components/modules/SectionActions'
import {Plus, Trash} from 'react-feather'

const CreateProject = () => {
    const {enqueueSnackbar} = useSnackbar()
    const columnsKey = useRef(4)

    const formCtrl = useFormControl({
        initialValues: {
            title: "",
        }
    })

    const columnsFormCtrl = useFormControl({
        initialValues: {
            columnTitle_1: "Ready",
            columnTitle_2: "In Progress",
            columnTitle_3: "Complete",
        }
    })

    type columnsFormCtrlKeys = keyof typeof columnsFormCtrl.values

    const handleRemoveColumn = (key: columnsFormCtrlKeys) => () => {
        const updatedValues = { ...columnsFormCtrl.values }

        if (typeof updatedValues[key] === "string") delete updatedValues[key]
        columnsFormCtrl.setValues(updatedValues)
    }

    const buildcolumns = (): React.ReactNode => {
        if(columnsFormCtrl?.values){
            return Object.keys(columnsFormCtrl.values).map((col) => {
                return (
                    <Grid size={12} key={col}>
                        <TextFieldFormCtrl
                            formCtrl={columnsFormCtrl}
                            name={col}
                            label="Column Title"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleRemoveColumn(col as columnsFormCtrlKeys)}
                                            >
                                                <Trash size={20}/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                },
                            }}
                        />
                    </Grid>
                )
            })
        }
        return null
    }

    const addColumn = () => {
        if(Object.keys(columnsFormCtrl.values).length < 5){
            columnsFormCtrl.setValues({
                ...columnsFormCtrl.values,
                ["columnTitle_" + columnsKey.current]: ""
            })
            columnsKey.current++
        }
    }

    const validateNumberOfColumns = () => {
        if (Object.keys(columnsFormCtrl.values).length < 3) {
            enqueueSnackbar("A Project Board requires at least 3 columns.", {variant: "error"})
            return false
        }
        return true
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (columnsFormCtrl.isValidatedForm() && formCtrl.isValidatedForm() && validateNumberOfColumns()){
            console.log(formCtrl.values, columnsFormCtrl.values)
        }
    }

    const hasMaxColumns = Object.keys(columnsFormCtrl.values).length >= 5

    return (
        <>
            <Helmet title="Create Project"/>
            <Box 
                p={4} 
                sx={{
                    alignItems: "center", 
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto"
                }}
            >
                <Card>
                    <form onSubmit={handleSubmit}>
                        <SectionHeader title="Create a new project" />
                        <Box p={4}>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <TextFieldFormCtrl 
                                        formCtrl={formCtrl}
                                        name="title"
                                        label="Title"
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <Box py={1}>
                                        <Typography variant='h3' gutterBottom>Create board columns</Typography>
                                        <Typography>Add up to 5 columns to your to you projects board.<br />The board should also have at least 3 columns.</Typography>
                                    </Box>
                                </Grid>
                                {buildcolumns()}
                                {
                                    !hasMaxColumns ?
                                    <Grid size={12}>
                                        <Button 
                                            startIcon={<Plus/>}
                                            fullWidth
                                            onClick={addColumn}
                                            variant='outlined'
                                            color="secondary"
                                        >Add Column</Button>
                                    </Grid>
                                    : null
                                }
                            </Grid>
                        </Box>
                        <SectionActions 
                            rightActions={
                                <>
                                    <LoadStateButton
                                        type="submit"
                                        variant='contained'
                                    >Create Project</LoadStateButton>
                                </>
                            }
                        />
                    </form>
                </Card>
            </Box>
        </>
    )
}

export default CreateProject