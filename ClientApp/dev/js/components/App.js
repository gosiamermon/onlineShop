import React, { Component } from 'react';
import { SidebarComponent } from "./sidebar"
import { Switch, withRouter, Redirect } from "react-router";
import { PublicRoute, PrivateRoute, PropsRoute } from 'react-router-with-props';
import { adminPanel, clientPanel } from "../helpers/routes"
import { AdminPanel } from "./adminPanel"
import { ClientPanel } from "./clientPanel"
import { connect } from "react-redux"
require('../../scss/style.scss');

class AppComponent extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                {/* <PrivateRoute path={clientPanel} component={ClientPanel} /> */}
                <Switch>
                    <PublicRoute path='/panel' component={AdminPanel} authed={false} redirectTo='/' />
                    <Redirect from='/' to='/panel' />
                </Switch>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export const App = withRouter(connect(mapStateToProps, null)(AppComponent));
