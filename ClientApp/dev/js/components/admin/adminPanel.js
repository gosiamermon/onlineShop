import React, { Component } from 'react'
import { adminPanelUsers, adminPanelProducts, adminPanelOrders } from '../../helpers/routes'
import { connect } from "react-redux";
import { Switch, Redirect } from 'react-router';
import { PublicRoute } from 'react-router-with-props';
import { SidebarComponent } from '../sidebar'
import { Users } from './users/users'
import { Products } from './products/products'
import { Orders } from './orders/orders'

export class AdminPanel extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="wrapper">
                <SidebarComponent />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <Switch>
                            <PublicRoute path={adminPanelUsers} component={Users} />
                            <PublicRoute path={adminPanelProducts} component={Products} />
                            <PublicRoute path={adminPanelOrders} component={Orders} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
