import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOrder, changeAmount, removeFromBasket } from '../../../actions/orders/orders.action-creators'
import { clientHome } from "../../../helpers/routes"
import { Link } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import FaClose from 'react-icons/lib/fa/close'


export class BasketComponent extends Component {

    componentDidMount() {
        let id;
        if (this.props.orderId) {
            sessionStorage.setItem("orderId", this.props.orderId)
            id = this.props.orderId
        }
        else {
            id = sessionStorage.orderId
        }
        this.props.getOrder(id)
    }

    render() {
        const { order } = this.props
        if (order) {
            order.orderItems = order.orderItems.map(item => {
                item.availableAmount = [];
                console.log(item.itemNumber)
                for (var i = 1; i <= item.itemNumber; i++) {
                    item.availableAmount.push(i)
                }
                return item
            })
            console.log(order.orderItems)
        }

        return (
            <div className="basket-container">
                <div className="products-header-wrapper">
                    <nav>
                        <Link to={`${clientHome}`} className="btn btn-primary">Continue shopping</Link>
                    </nav>
                    <div className="basket-title-wrapper header-title-wrapper">
                        <h2 className="products-form-title">Basket {order && order.orderItems.length ? `(${order.orderItems.length})` : ""}</h2>
                    </div>
                </div>
                <hr />
                {(order && order.orderItems.length) &&
                    <div>
                        <ul>
                            {
                                order.orderItems.map(item => {
                                    return (
                                        <li className="list-group-item" key={item.productId}>
                                            <div className="basket-item-container">
                                                <div className="basket-details-container">
                                                    <div>
                                                        <img className="img-basket img-thumbnail" src={item.imageSmall} />
                                                    </div>
                                                    <div className="basket-item-text">
                                                        <div className="form-group">
                                                            <span className="basket-producer">{item.producer}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <span>{item.productName}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Color: &nbsp;</label>
                                                            <span>{item.color}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Size: &nbsp;</label>
                                                            <span>{item.size}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Price: &nbsp;</label>
                                                            <span>{item.cost}$</span>
                                                        </div>
                                                        <form className="amount-form">
                                                            <FormGroup controlId={item.productName}>
                                                                <ControlLabel>Amount: </ControlLabel>
                                                                <FormControl
                                                                    value={item.productAmount}
                                                                    onChange={(e) => { this.changeAmount(e.target.value, item.productId) }}
                                                                    componentClass="select"
                                                                    placeholder="select">
                                                                    {
                                                                        item.availableAmount.map(amount => {
                                                                            console.log(item.productAmount)
                                                                            return (
                                                                                <option key={amount} value={amount}>{`${amount}`}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </FormControl>
                                                            </FormGroup>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div onClick={() => { this.removeFromBasket(item.productId) }} className="remove-button-container">
                                                    <h2 className="remove-button">
                                                        <FaClose />
                                                    </h2>
                                                </div>
                                            </div>
                                            <hr />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <nav className="to-counter-nav">
                            <Link to={`${clientHome}`} className="btn btn-warning">To the counter</Link>
                        </nav>
                    </div>
                }
                {
                    (!order || !order.orderItems.length) &&
                    <div className="noitems-container">
                        <h1>Your basket is empty</h1>
                    </div>
                }
            </div>
        )
    }


    changeAmount(amount, productId) {
        if (amount) {
            amount = Number(amount)
            this.props.changeAmount(this.props.orderId, productId, amount)
        }
    }

    removeFromBasket(productId) {
        this.props.removeFromBasket(this.props.orderId, productId)
    }
}


function mapStateToProps(state) {
    return {
        order: state.orders.order,
        orderId: state.orders.currentOrder.currentOrderId
    }
}

export const Basket = connect(mapStateToProps, { getOrder, changeAmount, removeFromBasket })(BasketComponent)


