import React, { Component } from 'react'
import '../../../assets/style/CreateProduct.css'
import axios from 'axios';
import validator from './../../../services/Validator';

export default class CreateProduct extends Component {

    constructor(props) {
        super(props)
        this.onChangeproductName = this.onChangeproductName.bind(this);
        this.onChangeproductDescription = this.onChangeproductDescription.bind(this);
        this.onChangeproductPrice = this.onChangeproductPrice.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangecateId = this.onChangecateId.bind(this);
        this.createProduct = this.createProduct.bind(this);

        this.state = {
            category: [],
            productName: '',
            productDescription: '',
            productPrice: '',
            image: '',
            quantity: 0,
            cateId: '',
            errors: {},
        }
        const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;
        const rules = [
            {
              field: 'productName',
              method: 'isEmpty',
              validWhen: false,
              message: 'This field is required.',
            },
            {
              field: 'productDescription',
              method: 'isEmpty',
              validWhen: false,
              message: 'This field is required.',
            },
            {
              field: 'productPrice',
              method: 'isEmpty',
              validWhen: false,
              message: 'This field is required.',
            },
            {
              field: 'image',
              method: 'isEmpty',
              validWhen: false,
              message: 'This field is required.',
            },
            {
              field: 'quantity',
              method: 'isEmpty',
              validWhen: false,
              message: 'This field is required.',
            },
            {
              field: 'quantity',
              method: 'isInt',
              args: [{min: 1}],
              validWhen: true,
              message: 'Quantity must be positive number!!',
            },
            {
              field: 'productPrice',
              method: 'isEmpty',
              validWhen: false,
              message: 'This field is required.',
            },
            {
              field: 'productPrice',
              method: 'isFloat',
              args: [{min: 1.00}],
              validWhen: true,
              message: 'Invalid money amount!!',
            },
            {
                field: 'productDescription',
                method: 'isEmpty',
                validWhen: false,
                message: 'This field is required.',
              },
            {
                field: 'cateId',
                method: 'isEmpty',
                validWhen: false,
                message: 'This field is required.',
              },
          ];
          this.validator = new validator(rules);
        this.getCategories();
    }

    onChangeproductName(e) {
        this.setState({
            productName: e.target.value
        });
    }
    onChangeproductPrice(e) {
        this.setState({
            productPrice: e.target.value
        });
    }
    onChangeproductDescription(e) {
        this.setState({
            productDescription: e.target.value
        });
    }
    onChangeImage(e) {
        this.setState({
            image: e.target.value
        });
    }
    onChangecateId(e) {
        this.setState({
            cateId: e.target.value
        });
    }
    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    getCategories() {
        axios
            .get('http://localhost:8080/categories/', {})
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        category: res.data,
                        categId: res.data[0].cateId
                    });
                }

            })
    }

    async createProduct(event) {
        event.preventDefault();
        this.setState({
            errors: this.validator.validate(this.state),
          });
          console.log(this.state);
        var product = {
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            image: this.state.image,
            quantity: this.state.quantity,
            cateId: this.state.cateId
        };

        

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        };
        await axios.post(`http://localhost:8080/products/create?cateId=${this.state.cateId}`, product,
            { headers }
        ).then(() => {
            this.props.history.push('/Admin/adminProduct')
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        const {errors} = this.state;
        return (
            <>
                <div className="createContainer">
                    <form action="/action_page.php">
                        <label for="fname">Product Name</label>
                        <input className="pname" type="text" id="fname" name="productName" placeholder="Product Name" value={this.state.productName} onChange={this.onChangeproductName} required />
                        {errors.productName && <div className="validation" style={{display: 'block', color: "red"}}>{errors.productName}</div>}
                        <label for="lname">Product Quantity</label>
                        <input className="pquant" type="text" id="lname" name="quantity" placeholder="Product Quantity" value={this.state.quantity} onChange={this.onChangeQuantity} required />
                        {errors.quantity && <div className="validation" style={{display: 'block', color: "red"}}>{errors.quantity}</div>}
                        <label for="lname">Product Price</label>
                        <input className="price" type="text" id="lname" name="price" placeholder="Product Price" value={this.state.productPrice} onChange={this.onChangeproductPrice} required />
                        {errors.productPrice && <div className="validation" style={{display: 'block', color: "red"}}>{errors.productPrice}</div>}
                        <label for="lname">Product Description</label>
                        <input className="pdes" type="text" id="lname" name="productDescription" placeholder="Product Description" value={this.state.productDescription} onChange={this.onChangeproductDescription} required />
                        {errors.productDescription && <div className="validation" style={{display: 'block', color: "red"}}>{errors.productDescription}</div>}
                        <label for="country">Categories</label>
                        <select name="subject" id="subject_input" value={this.state.cateId} name="categoryID" onChange={this.onChangecateId} required>
                            <option hidden selected>Categories</option>
                            {
                                this.state.category.map((item) => (
                                    <option key={item.cateId} value={item.cateId}>{item.cateName}</option>
                                ))
                            }
                        </select>
                        {errors.cateId && <div className="validation" style={{display: 'block', color: "red"}}>{errors.cateId}</div>}
                        <label for="subject">Product Image Link</label>
                        <textarea id="subject" name="subject" placeholder="Product Image Link" value={this.state.image} onChange={this.onChangeImage} required></textarea>
                        {errors.image && <div className="validation" style={{display: 'block', color: "red"}}>{errors.image}</div>}
                        <input className="updateBtn" type="submit" value="Create Product" onClick={(e) => { this.createProduct(e) }} />
                        <input type="submit" value="Check Image" />
                    </form>
                </div>
            </>
        )
    }
}
