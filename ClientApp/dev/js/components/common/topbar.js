import React, { Component } from "react";
import { Nav, NavItem, Navbar, Dropdown, DropdownButton, NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logout } from '../../actions/auth/auth.action-creators'
import { push } from "connected-react-router";
import { login, basket } from '../../helpers/routes'
import { Navigation } from './navigation'
import { clothing, footwear, accessories } from '../../helpers/productCategories'
import FaShoppingBasket from 'react-icons/lib/fa/shopping-basket'
import { getCurrentOrder } from '../../actions/orders/orders.action-creators'

class TopbarComponent extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getCurrentOrder(sessionStorage.userId)
    }

    render() {
        const { userEmail, isClientPanel, isLoggedIn, orderItemsCount } = this.props

        return (
            <Navbar collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">{this.getTitle()}</a>
                    </Navbar.Brand>
                </Navbar.Header>
                {isClientPanel &&
                    <Nav>
                        <Navigation items={clothing} header="Clothing" />
                        <Navigation items={footwear} header="Footwear" />
                        <Navigation items={accessories} header="Accessories" />
                    </Nav>
                }
                <Navbar.Collapse>
                    <ul className="nav navbar-nav navbar-right">
                        {
                            isClientPanel &&
                            <li onClick={() => { this.redirectToBasket() }} className="basket-icon-wrapper">
                                {
                                    orderItemsCount > 0 &&
                                    <h2 className="basket-badge-wrapper">
                                        <span className="badge basket-badge">{orderItemsCount}</span>
                                    </h2>
                                }
                                <h2 className="basket-icon">
                                    <FaShoppingBasket />
                                </h2>
                            </li>
                        }
                        {isClientPanel && isLoggedIn &&
                            <Navbar.Brand>
                                <span>{userEmail}</span>
                            </Navbar.Brand>
                        }
                        {isLoggedIn &&
                            <li>
                                <button className="btn btn-default btn-logout" onClick={() => this.logout()}>Logout</button>
                            </li>
                        }
                        {
                            !isLoggedIn &&
                            <li>
                                <button className="btn btn-default btn-logout" onClick={() => this.login()}>Sign in</button>
                            </li>
                        }
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        )

    }

    getTitle() {
        if (this.props.isClientPanel) {
            return "SuperShop"
        }
        return this.props.userEmail
    }

    logout() {
        this.props.logout()
    }

    login() {
        this.props.push(`${login}`)
    }

    redirectToBasket() {
        this.props.push(`${basket}`)
    }


}

function mapStateToProps(state, ownProps) {
    let orderItemsCount = state.orders.order ? state.orders.order.orderItems.length : state.orders.currentOrder.itemsCount
    if (!sessionStorage.userId) {
        orderItemsCount = 0
    }
    return {
        isClientPanel: ownProps.isClientPanel,
        userEmail: state.auth.userEmail,
        isLoggedIn: state.auth.loggedIn,
        orderItemsCount: orderItemsCount
    }
}

export const Topbar = withRouter(
    connect(mapStateToProps, { logout, push, getCurrentOrder })(TopbarComponent)
)
