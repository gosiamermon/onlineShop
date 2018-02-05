import React, { Component } from "react"
import { Nav, NavItem, Navbar, Dropdown, DropdownButton, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { push } from "connected-react-router";
import { clientPanelProducts } from '../../helpers/routes'

export class NavigationComponent extends Component {

    render() {
        const { items, header } = this.props
        return (
            <NavDropdown title={header} id="basic-nav-dropdown">
                {
                    items.map((item, index) => {
                        return (
                            <MenuItem key={index} onClick={() => { this.showProducts(item) }} >{item}</MenuItem>
                        )
                    })
                }

            </NavDropdown>
        )
    }

    showProducts(itemName) {
        this.props.push(`${clientPanelProducts}/${itemName}`)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        items: ownProps.items,
        header: ownProps.header
    }
}

export const Navigation = withRouter(
    connect(mapStateToProps, { push })(NavigationComponent)
)