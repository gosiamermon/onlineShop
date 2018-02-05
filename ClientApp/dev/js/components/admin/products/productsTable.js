import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Panel, Nav, Modal, Button } from "react-bootstrap";
import { push } from "connected-react-router";
var ReactTable = require("react-table").default;
import { getAllProducts, deleteProduct, getProduct } from '../../../actions/products/products.action-creators'
import { adminPanelProducts } from '../../../helpers/routes'


class ProductsTableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productIdToDelete: null,
            showModal: false
        }
    }

    componentDidMount() {
        this.props.getAllProducts()
    }

    render() {
        const { products } = this.props

        const columns = [
            {
                Header: "Category",
                accessor: "category"
            },
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Producer",
                accessor: "producer"
            },
            {
                Header: "Cost",
                accessor: "cost"
            },
            {
                Header: "Gender",
                accessor: "gender"
            },
            {
                Header: "Fabric",
                accessor: "fabric"
            },
            {
                Header: "Edit",
                accessor: "productId",
                filterable: false,
                Cell: row => {
                    return (
                        <div className="text-center">
                            <button
                                className="btn btn-info"
                                onClick={() => {
                                    this.editProduct(row.value)
                                }}
                            >
                                edit
                            </button>
                        </div>
                    )
                }
            },
            {
                Header: "Delete",
                accessor: "productId",
                filterable: false,
                Cell: row => {
                    return (
                        <div className="text-center">
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    this.deleteProduct(row.value)
                                }
                                }
                            >
                                delete
                            </button>
                        </div>
                    )
                }
            }
        ]
        return (
            <div className="col-sm-12 table-container table-wrapper">
                <nav className="button-wrapper">
                    <Link to={`${adminPanelProducts}/form/new`} className="btn btn-primary">
                        Add new product
                    </Link>
                </nav>
                <h1>Products</h1>
                <hr />
                <ReactTable
                    data={products}
                    columns={columns}
                    filterable
                    defaultFilterMethod={(filter, row) => {
                        let rowValue = row[filter.id].toLowerCase();
                        let filterValue = filter.value.toLowerCase();
                        return rowValue.includes(filterValue);
                    }}
                    defaultPageSize={13}
                    pageSize={13}
                    minRows={13}
                />
                <Modal bsSize="large" show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                    <Modal.Body>
                        <h4>Do you want to delete this product?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.confirmDeleteProduct.bind(this)}>Yes</Button>
                        <Button onClick={this.closeModal.bind(this)}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    closeModal() {
        this.setState({
            ...this.state,
            showModal: false
        });
    }

    deleteProduct(id) {
        this.setState({
            ...this.state,
            productIdToDelete: id,
            showModal: true
        });
    }

    confirmDeleteProduct() {
        this.props.deleteProduct(this.state.productIdToDelete);

        this.setState({
            ...this.state,
            productIdToDelete: "",
            showModal: false
        })
    }

    editProduct(id) {
        this.props.getProduct(id)
        this.props.push(`${adminPanelProducts}/form/${id}`)
    }


}

function mapStateToProps(state) {
    return {
        products: state.products.productsList.products
    }
}

export const ProductsTable = connect(mapStateToProps, { getAllProducts, deleteProduct, getProduct, push })(ProductsTableComponent) 