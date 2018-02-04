import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { PublicRoute } from 'react-router-with-props';
import { adminPanelUsers } from '../../../helpers/routes'
import { UsersTable } from './usersTable'
import { UsersForm } from './usersForm'

export class Users extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row">
                <Switch>
                    <PublicRoute path={`${adminPanelUsers}/form/new`} component={UsersForm} />
                    <PublicRoute path={`${adminPanelUsers}/form/:formMode/:id?`} component={UsersForm} />
                    <PublicRoute path={adminPanelUsers} component={UsersTable} />
                </Switch>
            </div>
        )
    }
}
