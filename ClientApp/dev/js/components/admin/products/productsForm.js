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
import { addProduct, editProduct } from "../../../actions/products/products.action-creators"
import { productCategory, productSubcategory, productFabric, productGender, productSize } from "../../../helpers/productCategories";

const newMode = "new";
const editMode = "edit";
let smallImgFile = "";
let bigImgFile = "";
class ProductsFormComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            smallImgFile: "",
            bigImgFile: ""
        }
    }


    getSmallPhoto(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            smallImgFile = reader.result
            this.setState({
                smallImgFile: smallImgFile
            })
        }
        reader.readAsDataURL(file);
    }

    getBigPhoto(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            bigImgFile = reader.result
            this.setState({
                bigImgFile: bigImgFile
            })
        }
        reader.readAsDataURL(file);
    }



    render() {
        const { handleSubmit, formMode, initialValues } = this.props
        const showBigImg = this.state.bigImgFile || (initialValues && initialValues.imageBig) ? true : false;
        const showSmallImg = this.state.smallImgFile || (initialValues && initialValues.imageSmall) ? true : false;
        let smallImgFile
        let bigImgFile

        if (showSmallImg) {
            smallImgFile = this.state.smallImgFile ? this.state.smallImgFile : initialValues.imageSmall;
        }
        if (showBigImg) {
            bigImgFile = this.state.bigImgFile ? this.state.bigImgFile : initialValues.imageBig;
        }

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
                        {!showSmallImg &&
                            <div className="form-group">
                                <label>Small image *</label>
                                <input onChange={(event) => { this.getSmallPhoto(event) }} id="sm" className="form-control" type="file"></input>
                            </div>
                        }
                        {
                            showSmallImg &&
                            <div className="col">
                                <div className="image-button-wrapper">
                                    <button onClick={() => { this.clearSmallPhoto() }} className="btn btn-primary">Change image</button>
                                </div>
                                <div>
                                    <img className="img-thumbnail" src={smallImgFile} />
                                </div>
                            </div>
                        }
                        {
                            !showBigImg &&
                            <div className="form-group">
                                <label>Big image *</label>
                                <input onChange={(event) => { this.getBigPhoto(event) }} id="big" className="form-control" type="file"></input>
                            </div>
                        }
                        {
                            showBigImg &&
                            <div className="col">
                                <div className="image-button-wrapper">
                                    <button onClick={() => { this.clearBigPhoto() }} className="btn btn-primary">Change image</button>
                                </div>
                                <img className="img-thumbnail" src={bigImgFile} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    clearSmallPhoto() {
        this.setState({
            smallImgFile: ""
        })
        smallImgFile = ""

    }

    clearBigPhoto() {
        this.setState({
            bigImgFile: ""
        })
        bigImgFile = ""
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

    if (!id) {
        return {
            initialValues,
            formMode: newMode,
            onSubmit: async (values, dispatch) => {
                try {
                    dispatch(addProduct(mapFormValuesToStoreModel(values, newMode)))
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    }

    const selectedProduct = state.products.product

    return {
        initialValues: selectedProduct,
        formMode: editMode,
        onSubmit: async (values, dispatch) => {
            try {
                dispatch(editProduct(selectedProduct.productId, mapFormValuesToStoreModel(values, editMode)))
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}

function mapFormValuesToStoreModel(formValues, mode) {
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
    product.imageSmall = smallImgFile
    product.imageBig = bigImgFile
    return product;
}

export const ProductsForm = compose(
    withRouter,
    connect(mapStateToProps, null),
    reduxForm({
        form: "products-form",
        enableReinitialize: true
    })
)(ProductsFormComponent);