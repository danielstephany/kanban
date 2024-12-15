import React, { ReactNode } from "react"
import { 
    FormControl,
    FormHelperText,
    InputLabel,
    Select
} from "@mui/material"
import type {
    SelectProps,
    SelectChangeEvent
} from "@mui/material"
import type { iUseFormCtrlRes } from "@src/hooks/useFormCtrl"

type TextFieldFormCtrlProps = SelectProps & {
    formCtrl: iUseFormCtrlRes,
    helperText?: string
    name: string,
}

const SelectFormCtrl = ({ formCtrl, helperText, name, fullWidth=true, children, label, ...others }: TextFieldFormCtrlProps) => {

    const handleOnChange = (event: SelectChangeEvent<unknown>) => {
        const target = event.target
        formCtrl.handleChange({target: {name: target.name, value: target.value as string}})
    }

    return (
        <>
            <FormControl 
                fullWidth
            >
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    name={name}
                    onChange={handleOnChange}
                    onBlur={formCtrl.handleBlure}
                    error={!!formCtrl.errors[name]}
                    fullWidth={fullWidth}
                    value={formCtrl.values[name]}
                    label={label}
                    {...others}
                >
                    {children}
                </Select>
            </FormControl>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            {typeof formCtrl.errors[name] === "string" ? <FormHelperText error >{formCtrl.errors[name]}</FormHelperText> : null}
        </>
    )
}

export default SelectFormCtrl