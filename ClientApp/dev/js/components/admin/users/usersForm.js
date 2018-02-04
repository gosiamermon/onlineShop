import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { required, email } from "../../../helpers/form-helpers/validators";
import { Form, reduxForm, Field } from "redux-form";
import { renderSelect } from "../../../helpers/form-helpers/select"
import { renderField } from "../../../helpers/form-helpers/field"
import { push } from "connected-react-router";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { adminPanelUsers } from "../../../helpers/routes";
import { FormGroup, Button } from "react-bootstrap";
import { addUser, editUser, getUser } from "../../../actions/users/users.action-creators"

const newMode = "new";
const editMode = "edit";
class UsersFormComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.userId) {
            this.props.getUser(this.props.userId)
        }
    }

    render() {
        const { handleSubmit, formMode } = this.props
        const showAddPassword = formMode === newMode

        return (
            <div className="form-wrapper col-lg-5">
                <nav>
                    <Link to={adminPanelUsers} className="btn btn-primary">Back to list</Link>
                </nav>
                <h2 className="form-title">{this.getUserFormTitle(formMode)}</h2>
                <hr />
                <Form onSubmit={handleSubmit}>

                    <Field
                        name="name"
                        type="text"
                        required
                        component={renderField}
                        props={{ label: "Name" }}
                        validate={[required]} />

                    <Field
                        name="surname"
                        type="text"
                        required
                        component={renderField}
                        props={{ label: "Surname" }}
                        validate={[required]} />

                    <Field
                        name="address"
                        type="text"
                        required
                        component={renderField}
                        props={{ label: "Address" }}
                        validate={[required]} />

                    <Field
                        name="email"
                        type="text"
                        required
                        component={renderField}
                        props={{ label: "e-mail" }}
                        validate={[required, email]} />
                    {showAddPassword &&
                        <Field
                            name="password"
                            type="password"
                            required
                            component={renderField}
                            props={{ label: "Password" }}
                            validate={[required]} />
                    }
                    {showAddPassword &&
                        <Field
                            name="repeatPassword"
                            type="password"
                            required
                            component={renderField}
                            props={{ label: "Repeat password" }}
                            validate={[required]} />
                    }
                    <FormGroup>
                        * Required
                    </FormGroup>
                    <Button bsStyle="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }

    getUserFormTitle(formMode) {
        if (formMode == newMode) {
            return "New user";
        }
        else {
            return "Edit user"
        }
    }
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.formMode
    const initialValues = null

    if (!id) {
        return {
            initialValues,
            formMode: newMode,
            onSubmit: async (values, dispatch) => {
                try {
                    dispatch(addUser(mapFormValuesToStoreModel(values, newMode)))
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    }

    const selectedUser = state.users.user

    return {
        userId: id,
        initialValues: selectedUser,
        formMode: editMode,
        onSubmit: async (values, dispatch) => {
            try {
                dispatch(editUser(selectedUser.userId, mapFormValuesToStoreModel(values, editMode)))
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}

function mapFormValuesToStoreModel(formValues, mode) {
    let user = {
        name: formValues.name,
        surname: formValues.surname,
        email: formValues.email,
        address: formValues.address
    }

    if (mode === newMode) {
        if (formValues.password === formValues.repeatPassword) {
            user.password = formValues.password
        }
        else {
            alert("Password and password repeat must match!")
            return;
        }
    }
    return user;
}

export const UsersForm = compose(
    withRouter,
    connect(mapStateToProps, { getUser }),
    reduxForm({
        form: "users-form",
        enableReinitialize: true
    })
)(UsersFormComponent);