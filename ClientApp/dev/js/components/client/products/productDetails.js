import React, { Component } from 'react'
import { connect } from "react-redux";
import { clientPanel, clientHome, clientPanelProducts, basket } from "../../../helpers/routes"
import { Switch, Redirect } from 'react-router';
import { PublicRoute } from 'react-router-with-props';
import { getProduct } from '../../../actions/products/products.action-creators'
import { compose } from "redux";
import { withRouter } from "react-router";
import { Form, reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { productSize } from '../../../helpers/productCategories'
import { renderSelect } from "../../../helpers/form-helpers/select"
import { required } from "../../../helpers/form-helpers/validators";
import { FormGroup, Button } from "react-bootstrap";

export class ProductDetailsComponent extends Component {


    componentDidMount() {
        this.props.getProduct(this.props.productId)
    }


    render() {
        const { product, handleSubmit } = this.props

        return (
            <div>
                {
                    product &&
                    <div>
                        <div className="products-header-wrapper">
                            <nav>
                                <Link to={`${clientPanelProducts}/${product.category}`} className="btn btn-primary">Back to list</Link>
                            </nav>
                            <div className="header-title-wrapper">
                                <h2 className="products-form-title">{product.name} - {product.category} </h2>
                                <h2 className="details-product-cost">{product.cost}$</h2>
                            </div>
                        </div>
                        <hr />
                        <div className="product-details-wrapper">
                            <div className="details-image-wrapper">
                                <img className="big-image img-thumbnail" src={product.imageBig} />
                            </div>
                            <div className="product-info">
                                <div className="form-group">
                                    <label className="order-label">Color: &nbsp;</label>
                                    <span>{product.color}</span>
                                </div>
                                <div className="form-group">
                                    <label className="order-label">Producer: &nbsp;</label>
                                    <span>{product.producer}</span>
                                </div>
                                <div className="form-group">
                                    <label className="order-label">Fabric: &nbsp;</label>
                                    <span>{product.fabric}</span>
                                </div>
                                <div className="form-group">
                                    <label className="order-label">Description: &nbsp;</label>
                                    <span>{product.description}</span>
                                </div>
                                <Form onSubmit={handleSubmit}>

                                    <Field
                                        name="category"
                                        type="text"
                                        required
                                        component={renderSelect}
                                        props={{
                                            label: "Choose size",
                                            data: productSize
                                        }}
                                        validate={[required]} />

                                    <Button bsStyle="primary" type="submit">
                                        Add to basket
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        product: state.products.product,
        productId: ownProps.match.params.id,
        onSubmit: async (values, dispatch) => {
            try {

                //dispatch(addProduct(mapFormValuesToStoreModel(values, smallPhoto, bigPhoto)))
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}


export const ProductDetails = compose(
    withRouter,
    connect(mapStateToProps, { getProduct }),
    reduxForm({
        form: "products-details",
        enableReinitialize: true
    })
)(ProductDetailsComponent);