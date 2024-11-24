import React, {useState} from "react"
import { 
    FormHelperText,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import type {
    TextFieldProps
} from "@mui/material"
import type { iUseFormCtrlRes } from "@src/hooks/useFormCtrl"

type PasswordFieldFormCtrlProps = TextFieldProps & {
    formCtrl: iUseFormCtrlRes,
    helperText?: string
    name: string,
    label: string,
    fullWidth?: boolean
}

const PasswordFieldFormCtrl = ({ formCtrl, helperText, name, label, fullWidth = true, ...others }: PasswordFieldFormCtrlProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>            
            <FormControl
                variant="outlined"            
                error={!!formCtrl.errors[name]}
                fullWidth={fullWidth}
            >
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <OutlinedInput
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    name={name}
                    onChange={formCtrl.handleChange}
                    onBlur={formCtrl.handleBlure}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            {typeof formCtrl.errors[name] === "string" ? <FormHelperText error >{formCtrl.errors[name]}</FormHelperText> : null}
        </>
    )
}

export default PasswordFieldFormCtrl