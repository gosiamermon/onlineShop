import React, { Component } from "react";
import { Link } from "react-router-dom";
import { main, adminPanelUsers, adminPanelProducts, adminPanelOrders } from "../helpers/routes"
import { withRouter } from "react-router"
import { connect } from "react-redux"


class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <a href="/">
                            OnlineShop
                        </a>
                    </li>
                    <li>
                        <Link to={adminPanelUsers}>Users</Link>
                        <Link to={adminPanelProducts}>Products</Link>
                        <Link to={adminPanelOrders}>Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export const SidebarComponent = connect(mapStateToProps, null)(Sidebar)