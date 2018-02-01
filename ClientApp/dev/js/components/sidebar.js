import React, { Component } from "react";
import { Link } from "react-router-dom";
import { main, users, products, orders } from "../helpers/routes"
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
                        <Link to={users}>Users</Link>
                        <Link to={products}>Products</Link>
                        <Link to={orders}>Orders</Link>
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