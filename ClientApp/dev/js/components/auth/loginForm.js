import React, { StatelessComponent, Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, FormGroup } from "react-bootstrap";
import { renderField } from "../../helpers/form-helpers/field";
import {
    Form,
    Field,
    reduxForm
} from "redux-form";
import { required, email } from "../../helpers/form-helpers/validators";
import { logIn } from "../../actions/auth/auth.action-creators";
import { push } from "connected-react-router";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { register } from '../../helpers/routes'
import { Topbar } from '../common/topbar'

export class LoginComponent extends Component {

    render() {
        const { handleSubmit, loginError } = this.props;

        return (
            <div>
                <div className="panel panel-default login-form">
                    <div className="panel-body">
                        <h1>Login</h1>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Field
                                    name="email"
                                    type="email"
                                    component={renderField}
                                    props={{ label: "Email" }}
                                    validate={[required, email]}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Field
                                    name="password"
                                    type="password"
                                    component={renderField}
                                    props={{ label: "Password" }}
                                    validate={[required]}
                                />
                            </FormGroup>
                            {loginError == true &&
                                <div className="alert alert-danger" role="alert">incorrect email or password</div>
                            }
                            <Button bsStyle="primary" type="submit">
                                Login
                        </Button>
                            <Button onClick={this.jumpToRegister.bind(this)} className="btn btn-default pull-right">
                                Register
                        </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }

    jumpToRegister() {
        this.props.push(register)
    }
}

function mapStateToProps(state) {
    return {
        loginError: state.auth.error
    }
}


export const LoginForm = compose(
    withRouter,
    connect(mapStateToProps, { logIn, push }),
    reduxForm({
        form: "login-form",
        onSubmit: async (values, dispatch) => {
            try {
                await dispatch(logIn(values));
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        }
    })
)(LoginComponent) 