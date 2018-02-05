import React, { Component } from 'react';
import { Switch, withRouter, Redirect } from "react-router";
import { PublicRoute, PrivateRoute, PropsRoute } from 'react-router-with-props';
import { adminPanel, clientPanel, auth, forbidden } from "../helpers/routes"
import { AdminPanel } from "./admin/adminPanel"
import { ClientPanel } from "./client/clientPanel"
import { Auth } from "./auth/auth"
import { connect } from "react-redux"
import { Topbar } from './common/topbar'
import { ForbiddenPage } from './common/forbiddenPage'
require('../../css/style.css');

require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/css/bootstrap-theme.min.css')
require('react-table/react-table.css')
require('react-widgets/dist/css/react-widgets.css')
require('font-awesome/css/font-awesome.min.css')

class AppComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isAdmin } = this.props
        if (!this.isLoggedIn()) {
            return (
                <div>
                    <Switch>
                        <PublicRoute path={clientPanel} component={ClientPanel} />
                        <PublicRoute path={auth} component={Auth} />
                        <Redirect from={'/'} to={clientPanel} />
                    </Switch>
                </div>
            )
        }

        return (
            <div>
                <Switch>
                    <PrivateRoute path={clientPanel} component={ClientPanel} authed={this.isLoggedIn() && !isAdmin} redirectTo={adminPanel} />
                    <PrivateRoute path={adminPanel} component={AdminPanel} authed={this.isLoggedIn() && isAdmin} redirectTo={forbidden} />
                    <PublicRoute path={forbidden} component={ForbiddenPage} />
                    <Redirect from={'/'} to={clientPanel} />
                </Switch>
            </div>
        )
    }


    isLoggedIn() {
        if (this.props.loggedIn && new Date() < this.props.tokenExpireDate) {
            return true
        }
        return false
    }

}

function mapStateToProps(state) {
    console.log(state.auth)
    return {
        tokenExpireDate: state.auth.expireDate,
        loggedIn: state.auth.loggedIn,
        isAdmin: state.auth.isAdmin
    };
}



export const App = withRouter(connect(mapStateToProps, null)(AppComponent));
