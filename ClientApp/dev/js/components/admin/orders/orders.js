import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { PublicRoute } from 'react-router-with-props';
import { adminPanelOrders } from '../../../helpers/routes'
import { OrdersTable } from './ordersTable'
import { OrderDetails } from './orderDetails'

export class Orders extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row">
                <Switch>
                    <PublicRoute path={`${adminPanelOrders}/details/:id?`} component={OrderDetails} />
                    <PublicRoute path={adminPanelOrders} component={OrdersTable} />
                </Switch>
            </div>
        )
    }
}
