import React, { Component } from 'react'
import '../components/CreateProduct.css'
import { Link} from "react-router-dom";
import axios from 'axios';

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
        }
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



    async createProduct() {
        var product = {
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            image: this.state.image,
            quantity: this.state.quantity,
            cateId: this.state.cateId
        };

        console.log(product);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        };
        await axios.post(`http://localhost:8080/products?cateId=${this.state.cateId}`, product,
            { headers }
        )
    }

    render() {
        return (
            <div id="container">
                <div className="underline">
                </div>
                <div className="icon_wrapper">
                </div>
                <form action="#" method="post" id="contact_form">
                    <div className="name">
                        <label for="name"></label>
                        <input className="name_input" type="text" placeholder="Product Name" name="productName" id="name_input" value={this.state.productName} onChange={this.onChangeproductName} required />
                    </div>
                    <div className="email">
                        <label for="quantity">Quantity</label>
                        <input className="email_input" type="number" min="0" placeholder="Quantity" name="quantity" id="email_input" value={this.state.quantity} onChange={this.onChangeQuantity} required />
                    </div>
                    <div className="telephone">
                        <label for="name"></label>
                        <input className="telephone_input" type="text" placeholder="Price" name="telephone" id="telephone_input" name="productPrice" value={this.state.productPrice} onChange={this.onChangeproductPrice} required />
                    </div>
                    <div className="subject">
                        <label for="subject"></label>
                        <select placeholder="Subject line" name="subject" id="subject_input" value={this.state.cateId} name="categoryID" onChange={this.onChangecateId} required>
                            <option hidden selected>Categories</option>
                            {
                                this.state.category.map((item) => (
                                    <option key={item.cateId} value={item.cateId}>{item.cateName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="telephone">
                        <label for="name"></label>
                        <input className="telephone_input" type="text" placeholder="Product Description" name="productDescription" id="telephone_input"
                            value={this.state.productDescription}
                            onChange={this.onChangeproductDescription} required />
                    </div>
                    <div className="message">
                        <label for="message"></label>
                        <textarea name="message" placeholder="Image Link" className="message_input" id="message_input" name="image" cols="30" rows="5" value={this.state.image} onChange={this.onChangeImage} required></textarea>
                    </div>
                    <div className="submit">
                        <input type="submit" value="Check Image" id="form_Check" />
                    </div>
                    <div className="submit">
                        <Link to="/Admin">
                            <input type="submit" onClick={this.createProduct} value="Create Product" id="form_button" />
                        </Link>
                    </div>
                </form>
            </div >
        )
    }
}
