import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import { PublicRoute, Redirect } from 'react-router-with-props';
import { clientPanelProducts } from '../../../helpers/routes'
import { ProductsList } from './productsList'
import { ProductDetails } from './productDetails'


export class Products extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <PublicRoute path={`${clientPanelProducts}/:itemName/details/:id?`} component={ProductDetails} />
                    <PublicRoute path={`${clientPanelProducts}/:itemName?`} component={ProductsList} />
                </Switch>
            </div>
        )
    }
}