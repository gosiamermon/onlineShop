import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router'
import * as history from "connected-react-router";
import { PublicRoute } from 'react-router-with-props';
import { login, register, auth } from '../../helpers/routes'
import { RegisterForm } from './registerForm'
import { LoginForm } from './loginForm'


export class Auth extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                <PublicRoute path={register} component={RegisterForm} />
                <PublicRoute path={login} component={LoginForm} />
                <Redirect from={auth} to={login} />
            </Switch>
        )
    }

}