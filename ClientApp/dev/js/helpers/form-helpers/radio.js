import React from "react";
import { FormGroup } from 'react-bootstrap';

export const renderRadio = ({
  input,
    label,
    type,
    required,
    readOnly,
    meta: { touched, error, warning }
}) => (
        <FormGroup>
            <label>{label}{required && " *"}</label>
            <div>
                <input className="form-control" {...input} readOnly={readOnly} placeholder={label} type={type} value="false" checked />
                <input className="form-control" {...input} readOnly={readOnly} placeholder={label} type={type} value="true" />
                {touched &&
                    ((error && <strong style={{ color: "#a94442" }}>{error}</strong>) ||
                        (warning && <strong style={{ color: "#8a6d3b" }}>{warning}</strong>))}
            </div>
        </FormGroup>
    )