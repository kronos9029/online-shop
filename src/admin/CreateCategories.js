import React, { Component } from 'react'
import axios from 'axios';
import { Link, Router } from 'react-router-dom';
import '../components/CreateCategories.css'

export default class CreateCategories extends Component {

    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.createCategory = this.createCategory.bind(this);

        this.state = {
            cateName: '',
            cateDescription: '',
        }
    }

    onChangeDescription(e) {
        this.setState({
            categoryDescription: e.target.value
        });
    }

    
    onChangeName(e) {
        this.setState({
            categoryName: e.target.value
        });
    }

    createCategory() {
        var category = {
            cateName: this.state.cateName,
            cateDescription: this.state.cateDescription
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        };

        axios.post('http://localhost:8080/categories', category, {
            headers
        })

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Create Category</h1>
                </div>
                <div className="row">
                </div>
                <div className="row input-container">
                    <div className="col-xs-12">
                        <div className="styled-input wide">
                            <input className="cateName" name="cateName" defaultValue={this.state.cateName} type="text" onChange={this.onChangeName} required />
                            <label>Category Name</label>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="styled-input wide">
                            <textarea name="cateDescription" defaultValue={this.state.cateDescription} onChange={this.onChangeDescription} required></textarea>
                            <label>Category Description</label>
                        </div>
                    </div>
                    <Link to={"/categories"}>
                    <div className="col-xs-12">
                        <div onClick={this.createCategory} className="btn-lrg submit-btn">Create</div>
                    </div>
                    </Link>
                </div>
            </div>
        )
    }
}
