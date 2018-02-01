import React, { Component } from 'react'
import { users, products, orders } from '../helpers/routes'
import { connect } from "react-redux";
import { Switch, Redirect } from 'react-router';
import { PublicRoute } from 'react-router-with-props';
import { SidebarComponent } from './sidebar'

export class AdminPanel extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="wrapper">
                <SidebarComponent />
                {/* <div id="page-content-wrapper">

                    <div className="container-fluid">
                        <Switch>
                            <PublicRoute path={users} component={UserListContainer} />
                            <PublicRoute path={products} component={ProductListContainer} />
                            <PublicRoute path={orders} component={OrderListContainer} />
                        </Switch>
                    </div>
                </div> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

//export const AdminPanelContainer = connect(mapStateToProps, null)(AdminPanel)