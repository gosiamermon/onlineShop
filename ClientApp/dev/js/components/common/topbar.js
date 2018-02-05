import React, { Component } from "react";
import { Nav, NavItem, Navbar, Dropdown, DropdownButton, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logout } from '../../actions/auth/auth.action-creators'
import { push } from "connected-react-router";
import { login } from '../../helpers/routes'
import { Navigation } from './navigation'
import { clothing, footwear, accessories } from '../../helpers/productCategories'
import FaShoppingBasket from 'react-icons/lib/fa/shopping-basket'

class TopbarComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { userEmail, isClientPanel, isLoggedIn } = this.props

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
                        <li>
                            <h2 className="basket-icon">
                                <FaShoppingBasket />
                            </h2>
                        </li>
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
            return "Your WardrobePro3000"
        }
        return this.props.userEmail
    }

    logout() {
        this.props.logout()
    }

    login() {
        this.props.push(`${login}`)
    }


}

function mapStateToProps(state, ownProps) {
    return {
        isClientPanel: ownProps.isClientPanel,
        userEmail: state.auth.userEmail,
        isLoggedIn: state.auth.loggedIn
    }
}

export const Topbar = withRouter(
    connect(mapStateToProps, { logout, push })(TopbarComponent)
)
