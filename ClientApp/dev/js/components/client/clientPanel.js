import React, { Component } from 'react'
import { connect } from "react-redux";
import { clientPanel, clientHome, clientPanelProducts, basket } from "../../helpers/routes"
import { Switch, Redirect } from 'react-router';
import { PublicRoute } from 'react-router-with-props';
import { Home } from './home/home'
import { Products } from './products/products'
import { Basket } from './basket/basket'
import { Topbar } from '../common/topbar'

export class ClientPanel extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { isClientPanel } = this.props
        return (
            <div>
                <Topbar isClientPanel={true} />
                <div className="container-fluid">
                    <Switch>
                        <PublicRoute path={`${clientPanelProducts}/:itemName?`} component={Products} />
                        <PublicRoute path={basket} component={Basket} />
                        <PublicRoute pash={clientHome} component={Home} />
                        <Redirect from={clientPanel} to={clientHome} />
                    </Switch>
                </div>
            </div>
        )
    }
}