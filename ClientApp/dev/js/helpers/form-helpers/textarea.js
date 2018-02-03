import React from "react";
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export const renderTextArea = ({
    input,
    label,
    type,
    disabled,
    required,
    readOnly,
    meta: { touched, error, warning }
}) => {
    return (
        <FormGroup controlId="formControlsTextarea">
            <ControlLabel>{label}{required && " *"}</ControlLabel>
            <FormControl disabled={disabled} readOnly={readOnly} type={type} {...input} componentClass="textarea" placeholder={label} />
        </FormGroup>
    )
}