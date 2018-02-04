import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Form, reduxForm, Field } from "redux-form";
import { renderSelect } from "../../../helpers/form-helpers/select"
import { push } from "connected-react-router";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { adminPanelOrders } from "../../../helpers/routes";
import { FormGroup, Button } from "react-bootstrap";
import { changeStatus, getOrder } from "../../../actions/orders/orders.action-creators"
import { orderStatus } from "../../../helpers/productCategories";


class OrderDetailsComponent extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.getOrder(this.props.orderId)
    }

    render() {
        const { handleSubmit } = this.props
        let customer
        if (this.props.initialValues) {
            customer = `${this.props.initialValues.user.name} ${this.props.initialValues.user.surname}`
        }

        return (
            <div className="products-container">
                <div className="products-header-wrapper">
                    <nav>
                        <Link to={adminPanelOrders} className="btn btn-primary">Back to list</Link>
                    </nav>
                    <h2 className="products-form-title">Order details</h2>
                </div>
                <hr />
                <div className="row">
                    <div className="form-wrapper col-lg-5">
                        <div className="form-group">
                            <label className="order-label">Customer: &nbsp;</label>
                            <span>{customer}</span>
                        </div>
                        <div className="form-group">
                            <label className="order-label">Customer e-mail: &nbsp;</label>
                            <span>{this.props.initialValues ? this.props.initialValues.userEmail : ""}</span>
                        </div>
                        <div className="form-group">
                            <label className="order-label">Delivery address: &nbsp;</label>
                            <span>{this.props.initialValues ? this.props.initialValues.user.address : ""}</span>
                        </div>
                        <div className="form-group">
                            <label className="order-label">Order date: &nbsp;</label>
                            <span>{this.props.initialValues ? this.props.initialValues.orderDate : ""}</span>
                        </div>
                        <div>
                            <label className="order-label">Items: &nbsp;</label>
                            <div className="order-items-container">
                                <hr />
                                {
                                    this.props.initialValues &&
                                    this.props.initialValues.orderItems.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="form-group">
                                                    <label>Product name: &nbsp;</label>
                                                    <span>{item.productName}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label>Price: &nbsp;</label>
                                                    <span>{item.subtotal}</span>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="order-label">Total payment: &nbsp;</label>
                            <span>{this.props.initialValues ? this.props.initialValues.totalValue : ""}</span>
                        </div>
                        <Form onSubmit={handleSubmit}>

                            <Field
                                name="status"
                                type="text"
                                required
                                component={renderSelect}
                                props={{
                                    label: "Status",
                                    data: orderStatus
                                }} />

                            <Button bsStyle="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className="col-lg-5 file-upload-wrapper">

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const initialValues = state.orders.order
    const id = ownProps.match.params.id
    return {
        initialValues: initialValues,
        orderId: id,
        onSubmit: async (values, dispatch) => {
            try {
                dispatch(changeStatus(initialValues.orderId, values.status))
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}


export const OrderDetails = compose(
    withRouter,
    connect(mapStateToProps, { getOrder }),
    reduxForm({
        form: "orders-form",
        enableReinitialize: true
    })
)(OrderDetailsComponent);