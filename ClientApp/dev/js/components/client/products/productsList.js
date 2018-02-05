import React, { Component } from 'react'
import { connect } from "react-redux";
import { clientPanelProducts } from "../../../helpers/routes"
import { Switch, Redirect } from 'react-router';
import { PublicRoute } from 'react-router-with-props';
import { getAllProducts, setCurrentProduct } from '../../../actions/products/products.action-creators'
import { push } from "connected-react-router";

export class ProductsListComponent extends Component {

    componentDidMount() {
        this.props.getAllProducts()
    }

    render() {
        const { products } = this.props
        const products2D = this.mapProductsTo2DArray(products)

        return (
            <div className="products-col">
                {
                    products2D.map((productsRow, index) => {
                        return (
                            <div className="products-row" key={index}>
                                {
                                    productsRow.map((product, index) => {
                                        return (
                                            <div onClick={() => { this.showDetails(product) }} key={index} className="single-product-wrapper">
                                                <img className="img-thumbnail" src={product.imageSmall} />
                                                <div>
                                                    <span className="product-name">{`${product.name}- ${product.category}`}</span>
                                                    <span className="product-price">{product.cost}$</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    mapProductsTo2DArray(products) {
        let products2DArray = [];
        if (products) {
            let j = 0;
            let k = 0;
            products2DArray[j] = []
            for (let i = 0; i < products.length; i++) {
                if (!products2DArray[j]) {
                    products2DArray[j] = []
                }
                products2DArray[j][k] = products[i]
                k = k + 1;
                if ((i + 1) % 4 === 0) {
                    j = j + 1
                    k = 0;
                }
            }
        }
        return products2DArray;
    }

    showDetails(product) {
        this.props.push(`${clientPanelProducts}/${this.props.item}/details/${product.productId}/`)
    }

}


function mapStateToProps(state, ownProps) {

    const item = ownProps.match.params.itemName
    const products = state.products.productsList.products.filter(product => product.category === item)
    return {
        item: item,
        products: products
    }
}


export const ProductsList = connect(mapStateToProps, { push, getAllProducts })(ProductsListComponent)