import React from 'react'
import { Combobox } from 'react-widgets';
import { FormGroup } from 'react-bootstrap';

export const renderSelect = ({
  input,
    data,
    label,
    type,
    textField,
    valueField,
    required,
    disabled,
    readOnly,
    meta: { touched, error, warning }
}) => (
        <FormGroup>
            <label>{label}{required && " *"}</label>
            <div>
                <Combobox {...input}
                    onBlur={() => input.onBlur()}
                    value={input.value || []} // requires value to be an array
                    data={data}
                    readOnly={readOnly}
                    disabled={disabled}
                    textField={textField}
                    valueField={valueField}
                />
                {touched &&
                    ((error && <strong style={{ color: "#a94442" }}>{error}</strong>) ||
                        (warning && <strong style={{ color: "#8a6d3b" }}>{warning}</strong>))}
            </div>
        </FormGroup>
    )
