import React, { Component } from 'react';
import { SidebarComponent } from "./sidebar"
import { Switch, withRouter, Redirect } from "react-router";
import { PublicRoute, PrivateRoute, PropsRoute } from 'react-router-with-props';
import { adminPanel, clientPanel } from "../helpers/routes"
import { AdminPanel } from "./admin/adminPanel"
import { ClientPanel } from "./client/clientPanel"
import { connect } from "react-redux"
require('../../css/style.css');

require('bootstrap/dist/css/bootstrap.css')
require('react-table/react-table.css')
require('react-widgets/dist/css/react-widgets.css')

class AppComponent extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                <Switch>
                    <PublicRoute path={clientPanel} component={ClientPanel} />
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
