import React from "react"
import { 
    TextField,
    FormHelperText
} from "@mui/material"
import type {
    TextFieldProps
} from "@mui/material"
import type {tUseFormCtrl} from "@src/hooks/useFormCtrl"

type TextFieldFormCtrlProps = TextFieldProps & {
    formCtrl: tUseFormCtrl,
    helperText?: string
    name: string,
}

const TextFieldFormCtrl = ({ formCtrl, helperText, name, ...others }: TextFieldFormCtrlProps) => {

    return (
        <>
            <TextField
                name={name}
                onChange={formCtrl.handleChange}
                onBlur={formCtrl.handleBlure}
                error={!!formCtrl.errors[name]}
                {...others}
            />
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            {typeof formCtrl.errors[name] === "string" ? <FormHelperText error >{formCtrl.errors[name]}</FormHelperText> : null}
        </>
    )
}

export default TextFieldFormCtrl