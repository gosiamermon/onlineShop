import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Panel, Nav, Modal, Button } from "react-bootstrap";
import { push } from "connected-react-router";
var ReactTable = require("react-table").default;
import { getAllOrders, getOrder } from '../../../actions/orders/orders.action-creators'
import { adminPanelOrders } from '../../../helpers/routes'


class OrdersTableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
    }

    componentDidMount() {
        this.props.getAllOrders()
    }

    render() {
        const { orders } = this.props

        const columns = [
            {
                Header: "Order date",
                accessor: "orderDate"
            },
            {
                Header: "Status",
                accessor: "status"
            },
            {
                Header: "Total payment [$]",
                accessor: "totalValue"
            },
            {
                Header: "Details",
                accessor: "orderId",
                filterable: false,
                Cell: row => {
                    return (
                        <div className="text-center">
                            <button
                                className="btn btn-info"
                                onClick={() => {
                                    this.showDetails(row.value)
                                }}
                            >
                                Show details
                            </button>
                        </div>
                    )
                }
            }
        ]
        return (
            <div className="col-sm-12 table-container table-wrapper">
                <h1 className="orders-title">Orders</h1>
                <hr />
                <ReactTable
                    data={orders}
                    columns={columns}
                    filterable
                    defaultFilterMethod={(filter, row) => {
                        let rowValue = row[filter.id].toLowerCase();
                        let filterValue = filter.value.toLowerCase();
                        return rowValue.includes(filterValue);
                    }}
                    defaultPageSize={14}
                    pageSize={14}
                    minRows={14}
                />
            </div>
        )
    }

    showDetails(id) {
        console.log('showDetails')
        this.props.getOrder(id)
        this.props.push(`${adminPanelOrders}/details/${id}`)
    }


}

function mapStateToProps(state) {
    return {
        orders: state.orders.ordersList.orders
    }
}

export const OrdersTable = connect(mapStateToProps, { getAllOrders, getOrder, push })(OrdersTableComponent) 