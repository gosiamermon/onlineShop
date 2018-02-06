import React from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'
import { FormGroup } from 'react-bootstrap';

export const renderMultiselect = ({
    // input, data, valueField, textField 
    input,
    data,
    label,
    valueField,
    textField,
    type,
    required,
    readOnly,
    meta: { touched, error, warning }
}) =>
    <FormGroup>
        <label>{label}{required && " *"}</label>
        <div>
            <Multiselect {...input}
                readOnly={readOnly}
                onBlur={() => input.onBlur()}
                value={input.value || []} // requires value to be an array
                data={data}
                valueField={valueField}
                textField={textField}
            />
            {touched &&
                ((error && <strong style={{ color: "#a94442" }}>{error}</strong>) ||
                    (warning && <strong style={{ color: "#8a6d3b" }}>{warning}</strong>))}
        </div>
    </FormGroup>
