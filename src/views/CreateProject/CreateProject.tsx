import React from 'react'
import Helmet from 'react-helmet'
import {
    Box,
    Card,
    Grid2 as Grid,
    Button
} from "@mui/material"
import SectionHeader from '@src/components/modules/SectionHeader'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import useFormControl from '@src/hooks/useFormCtrl'
import type { tFormCtrlValues } from '@src/hooks/useFormCtrl'
import LoadStateButton from '@src/components/controls/LoadStateButton'
import SectionActions from '@src/components/modules/SectionActions'

const validate = (values: tFormCtrlValues, _: tFormCtrlValues) => values.title ? {} : { title: true }

const CreateProject = () => {

    const formCtrl = useFormControl({
        initialValues: {title: ""},
        validate
    })

    return (
        <>
            <Helmet title="Create Project"/>
            <Box p={4} sx={{height: "100%", alignItems: "center", justifyContent: "center"}}>
                <Card>
                    <SectionHeader title="Create a new project" />
                    <Box p={4}>
                        <Grid container spacing={2}>
                            <Grid size={{sm: 12, md: 6}}>
                                <TextFieldFormCtrl 
                                    formCtrl={formCtrl}
                                    name="title"
                                    label="Title"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <SectionActions 
                        leftActions={
                            <>
                                <LoadStateButton variant='contained'>test</LoadStateButton>
                                <Button variant='contained'>test</Button>
                                <Button variant='contained'>test</Button>
                            </>
                        }
                        rightActions={
                            <>
                                <LoadStateButton variant='contained'>test</LoadStateButton>
                                <LoadStateButton variant='contained'>Submit</LoadStateButton>
                            </>
                        }
                    />
                </Card>
            </Box>
        </>
    )
}

export default CreateProject