import React from "react";
import { FormGroup } from 'react-bootstrap';

export const renderField = ({
    input,
    label,
    type,
    disabled,
    required,
    readOnly,
    meta: { touched, error, warning }
}) => {
    return (
        <FormGroup>
            <label>{label}{required && " *"}</label>
            <div>
                <input disabled={disabled} readOnly={readOnly} className="form-control" {...input} placeholder={label} type={type} />
                {touched &&
                    ((error && <strong style={{ color: "#a94442" }}>{error}</strong>) ||
                        (warning && <strong style={{ color: "#8a6d3b" }}>{warning}</strong>))}
            </div>
        </FormGroup>
    )
}