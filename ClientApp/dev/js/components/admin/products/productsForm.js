import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { required, number } from "../../../helpers/form-helpers/validators";
import { Form, reduxForm, Field } from "redux-form";
import { renderSelect } from "../../../helpers/form-helpers/select"
import { renderField } from "../../../helpers/form-helpers/field"
import { renderRadio } from "../../../helpers/form-helpers/radio"
import { renderFile } from "../../../helpers/form-helpers/file"
import { renderTextArea } from "../../../helpers/form-helpers/textarea"
import { push } from "connected-react-router";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { adminPanelProducts } from "../../../helpers/routes";
import { FormGroup, Button } from "react-bootstrap";
import { addProduct, editProduct, uploadSmallPhoto, uploadBigPhoto } from "../../../actions/products/products.action-creators"
import { productCategory, productSubcategory, productFabric, productGender, productSize } from "../../../helpers/productCategories";

const newMode = "new";
const editMode = "edit";

class ProductsFormComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.uploadBigPhoto("")
        this.props.uploadSmallPhoto("")
    }

    getSmallPhoto(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.props.uploadSmallPhoto(reader.result)
        }
        reader.readAsDataURL(file);
    }

    getBigPhoto(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.props.uploadBigPhoto(reader.result)
        }
        reader.readAsDataURL(file);
    }



    render() {
        const { handleSubmit, formMode } = this.props

        return (
            <div className="products-container">
                <div className="products-header-wrapper">
                    <nav>
                        <Link to={adminPanelProducts} className="btn btn-primary">Back to list</Link>
                    </nav>
                    <h2 className="products-form-title">{this.getProductFormTitle(formMode)}</h2>
                </div>
                <hr />
                <div className="row">
                    <div className="form-wrapper col-lg-5">
                        <Form onSubmit={handleSubmit}>

                            <Field
                                name="category"
                                type="text"
                                required
                                component={renderSelect}
                                props={{
                                    label: "Category",
                                    data: productCategory
                                }}
                                validate={[required]} />

                            <Field
                                name="gender"
                                type="text"
                                required
                                component={renderSelect}
                                props={{
                                    label: "Gender",
                                    data: productGender
                                }}
                                validate={[required]} />

                            <Field
                                name="fabric"
                                type="text"
                                required
                                component={renderSelect}
                                props={{
                                    label: "Fabric",
                                    data: productFabric
                                }}
                                validate={[required]} />
                            <Field
                                name="size"
                                type="text"
                                required
                                component={renderSelect}
                                props={{
                                    label: "Size",
                                    data: productSize
                                }}
                                validate={[required]} />

                            <Field
                                name="name"
                                type="text"
                                required
                                component={renderField}
                                props={{ label: "Name" }}
                                validate={[required]} />
                            <Field
                                name="color"
                                type="text"
                                required
                                component={renderField}
                                props={{ label: "Color" }}
                                validate={[required]} />
                            <Field
                                name="itemNumber"
                                type="text"
                                required
                                component={renderField}
                                props={{ label: "Amount" }}
                                validate={[required, number]} />

                            <Field
                                name="producer"
                                type="text"
                                required
                                component={renderField}
                                props={{ label: "Producer" }}
                                validate={[required]} />
                            <Field
                                name="cost"
                                type="text"
                                required
                                component={renderField}
                                props={{ label: "Cost" }}
                                validate={[required, number]} />
                            <Field
                                name="description"
                                type="text"
                                required
                                component={renderTextArea}
                                props={{ label: "Description" }}
                                validate={[required]} />
                            <FormGroup>
                                * Required
                            </FormGroup>
                            <Button bsStyle="primary" type="submit">
                                Submit
                    </Button>
                        </Form>
                    </div>
                    <div className="col-lg-5 file-upload-wrapper">
                        {!this.props.smallPhoto &&
                            <div className="form-group">
                                <label>Small image *</label>
                                <input onChange={(event) => { this.getSmallPhoto(event) }} id="sm" className="form-control" type="file"></input>
                            </div>
                        }
                        {
                            this.props.smallPhoto &&
                            <div className="col">
                                <div className="image-button-wrapper">
                                    <button onClick={() => { this.clearSmallPhoto() }} className="btn btn-primary">Change image</button>
                                </div>
                                <div>
                                    <img className="img-thumbnail" src={this.props.smallPhoto} />
                                </div>
                            </div>
                        }
                        {
                            !this.props.bigPhoto &&
                            <div className="form-group">
                                <label>Big image *</label>
                                <input onChange={(event) => { this.getBigPhoto(event) }} id="big" className="form-control" type="file"></input>
                            </div>
                        }
                        {
                            this.props.bigPhoto &&
                            <div className="col">
                                <div className="image-button-wrapper">
                                    <button onClick={() => { this.clearBigPhoto() }} className="btn btn-primary">Change image</button>
                                </div>
                                <img className="img-thumbnail" src={this.props.bigPhoto} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    clearSmallPhoto() {
        this.props.uploadSmallPhoto("", true)
    }

    clearBigPhoto() {
        this.props.uploadBigPhoto("", true)
    }

    getProductFormTitle(formMode) {
        if (formMode == newMode) {
            return "New product";
        }
        else {
            return "Edit product"
        }
    }
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.formMode
    const initialValues = null
    let smallPhoto = ""
    let bigPhoto = ""
    if (state.products.smallPhoto.photo) {
        smallPhoto = state.products.smallPhoto.photo
    }
    if (state.products.bigPhoto.photo) {
        bigPhoto = state.products.bigPhoto.photo
    }

    if (!id) {
        return {
            initialValues,
            smallPhoto: smallPhoto,
            bigPhoto: bigPhoto,
            formMode: newMode,
            onSubmit: async (values, dispatch) => {
                try {
                    dispatch(addProduct(mapFormValuesToStoreModel(values, smallPhoto, bigPhoto)))
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    }

    const selectedProduct = state.products.product

    if (selectedProduct && !smallPhoto && !state.products.smallPhoto.wasRemoved) {
        smallPhoto = selectedProduct.imageSmall
    }
    if (selectedProduct && !bigPhoto && !state.products.bigPhoto.wasRemoved) {
        bigPhoto = selectedProduct.imageBig
    }
    return {
        initialValues: selectedProduct,
        smallPhoto: smallPhoto,
        bigPhoto: bigPhoto,
        formMode: editMode,
        onSubmit: async (values, dispatch) => {
            try {
                dispatch(editProduct(selectedProduct.productId, mapFormValuesToStoreModel(values, smallPhoto, bigPhoto)))
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}

function mapFormValuesToStoreModel(formValues, smallPhoto, bigPhoto) {
    let product = {
        name: formValues.name,
        category: formValues.category,
        color: formValues.color,
        cost: formValues.cost,
        fabric: formValues.fabric,
        description: formValues.description,
        gender: formValues.gender,
        itemNumber: formValues.itemNumber,
        isAvailable: formValues.itemNumber !== 0,
        producer: formValues.producer,
        size: formValues.size
    }
    product.imageSmall = smallPhoto
    product.imageBig = bigPhoto

    return product;
}

export const ProductsForm = compose(
    withRouter,
    connect(mapStateToProps, { uploadSmallPhoto, uploadBigPhoto }),
    reduxForm({
        form: "products-form",
        enableReinitialize: true
    })
)(ProductsFormComponent);