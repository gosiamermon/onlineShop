import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { PublicRoute } from 'react-router-with-props';
import { adminPanelProducts } from '../../../helpers/routes'
import { ProductsTable } from './productsTable'
import { ProductsForm } from './productsForm'

export class Products extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row">
                <Switch>
                    <PublicRoute path={`${adminPanelProducts}/form/new`} component={ProductsForm} />
                    <PublicRoute path={`${adminPanelProducts}/form/:formMode/:id?`} component={ProductsForm} />
                    <PublicRoute path={adminPanelProducts} component={ProductsTable} />
                </Switch>
            </div>
        )
    }
}
