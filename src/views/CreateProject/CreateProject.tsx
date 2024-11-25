import React, {useRef} from 'react'
import Helmet from 'react-helmet'
import {
    Typography,
    Box,
    Card,
    Grid2 as Grid,
    Button
} from "@mui/material"
import SectionHeader from '@src/components/modules/SectionHeader'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import useFormControl from '@src/hooks/useFormCtrl'
import LoadStateButton from '@src/components/controls/LoadStateButton'
import SectionActions from '@src/components/modules/SectionActions'
import {Plus} from 'react-feather'

const CreateProject = () => {
    const columnsKey = useRef(4)

    const formCtrl = useFormControl({
        initialValues: {
            title: "test",
        }
    })

    const columnsFormCtrl = useFormControl({
        initialValues: {
            columnTitle_1: "Ready",
            columnTitle_2: "In Progress",
            columnTitle_3: "Complete",
        }
    })

    console.log(columnsFormCtrl.values)

    const buildcolumns = (): React.ReactNode => {
        if(columnsFormCtrl?.values){
            return Object.keys(columnsFormCtrl.values).map(col => {
                return (
                    <Grid size={12} key={col}>
                        <TextFieldFormCtrl
                            formCtrl={columnsFormCtrl}
                            name={col}
                            label="Column Title"
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
                                    <Typography>Add up to 5 columns to your to you Projects Board.</Typography>
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
                                <LoadStateButton variant='contained'>Create Project</LoadStateButton>
                            </>
                        }
                    />
                </Card>
            </Box>
        </>
    )
}

export default CreateProject