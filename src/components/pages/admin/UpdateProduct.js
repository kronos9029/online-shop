import React, { Component } from 'react'
import axios from 'axios';                      
import '../../../assets/style/UpdateProduct.css'
import validator from './../../../services/Validator';

export default class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeproductName = this.onChangeproductName.bind(this);
        this.onChangeproductDescription = this.onChangeproductDescription.bind(this);
        this.onChangeproductPrice = this.onChangeproductPrice.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangecateId = this.onChangecateId.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.state = {
            category: [],
            productName: '',
            productDescription: '',
            productPrice: '',
            image: '',
            quantity: '',
            status:'',
            categoryDetail: {
                cateId: '',
                cateName: '',
                cateDescription: '',
            },
            productId: null,
            errors: {},
        }
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
                method: 'isInt',
                args: [{min: 1}],
                validWhen: true,
                message: 'Quantity must be positive number!!',
              },
            {
              field: 'quantity',
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
    componentDidMount() {
        this.getproduct(this.props.match.params.id);
    }
    getCategories() {
        axios
            .get('http://localhost:8080/categories', {})
            .then(res => {
                this.setState({
                    category: res.data,
                });
            })
    }

    getproduct(productId) {
        
        axios
            .get(`http://localhost:8080/products/${productId}`)
            .then(res => {
                this.setState({
                    productId: res.data.productId,
                    productName: res.data.productName,
                    productDescription: res.data.productDescription,
                    productPrice: res.data.productPrice.toString(),
                    image: res.data.image,
                    quantity: res.data.quantity.toString(),
                    status: res.data.status,
                    categoryDetail: {
                        cateId: res.data.category.cateId,
                        cateName: res.data.category.cateName,
                        cateDescription: res.data.category.cateDescription,
                    }
                    
                })
            });
    }

    updateProduct(event) {
        event.preventDefault();
        this.setState({
            errors: this.validator.validate(this.state),
          });
        console.log(this.state.categoryDetail)
        var data = {
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            image: this.state.image,
            quantity: this.state.quantity,
            status: this.state.status,
            category: {
                cateId: this.state.categoryDetail.cateId,
                cateName: this.state.categoryDetail.cateName,
                cateDescription: this.state.categoryDetail.cateDescription
            }
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        };
        axios.put(`http://localhost:8080/products/${this.state.productId}`,
            data, { headers }).then(response => {
                console.log(response.data);
                this.props.history.push('/Admin/adminProduct');
            })
            .catch(e => {
                console.log(e);
            });
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
        let category = this.state.category.find((i) => {
            return i.cateId === Number(e.target.value)
        })
        this.setState({
            categoryDetail: {
                ...category
            },
        });
    }
    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }
    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }
    render() {
        const {errors} = this.state;
        return (
            <>
                <div className="updateContainer">
                    <form action="/action_page.php">
                        <label for="fname">Product Name</label>
                        {errors.productName && <div className="validation" style={{display: 'block', color: "red"}}>{errors.productName}</div>}
                        <input className="pname" type="text" id="fname" name="productName" placeholder="Product Name" value={this.state.productName} onChange={this.onChangeproductName} required />
                        <label for="lname">Product Quantity</label>
                        {errors.quantity && <div className="validation" style={{display: 'block', color: "red"}}>{errors.quantity}</div>}
                        <input className="pquant" type="text" id="lname" name="quantity" placeholder="Product Quantity" value={this.state.quantity} onChange={this.onChangeQuantity} required />
                        <label for="lname">Product Price</label>
                        {errors.productPrice && <div className="validation" style={{display: 'block', color: "red"}}>{errors.productPrice}</div>}
                        <input className="price" type="text" id="lname" name="price" placeholder="Product Price" value={this.state.productPrice} onChange={this.onChangeproductPrice} required />
                        <label for="lname">Product Description</label>
                        {errors.productDescription && <div className="validation" style={{display: 'block', color: "red"}}>{errors.productDescription}</div>}
                        <input className="pdes" type="text" id="lname" name="productDescription" placeholder="Product Description" value={this.state.productDescription} onChange={this.onChangeproductDescription} required />
                        <label for="country">Categories</label>
                        {errors.cateId && <div className="validation" style={{display: 'block', color: "red"}}>{errors.cateId}</div>}
                        <select id="country" name="category" onChange={this.onChangecateId}>
                            {
                                this.state.category.map((item) => (
                                    <option key={item.cateId} selected={item.cateId === this.state.categoryDetail.cateId}
                                    value={item.cateId}>
                                    {item.cateName}
                                    </option>
                                ))
                            }
                        </select>
                        <select  value={this.state.status}
                            onChange={this.onChangeStatus}>
                            <option>ACTIVE</option>
                            <option>INACTIVE</option>
                            ))
                        </select>
                        <label for="subject">Product Image Link</label>
                        {errors.image && <div className="validation" style={{display: 'block', color: "red"}}>{errors.image}</div>}
                        <textarea id="subject" name="subject" placeholder="Product Image Link" value={this.state.image} onChange={this.onChangeImage} required></textarea>

                        <input className="updateBtn" type="submit" value="Update Product" onClick={(e) => {this.updateProduct(e)}} />
                        <input type="submit" value="Check Image" />
                    </form>
                </div>
            </>
        )
    }
}

