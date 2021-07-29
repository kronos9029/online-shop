import React, { Component } from 'react'
import axios from 'axios';
import validator from './../../../services/Validator';
import '../../../assets/style/CreateCategories.css';

export default class CreateCategories extends Component {

    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.createCategory = this.createCategory.bind(this);

        this.state = {
            cateName: '',
            cateDescription: '',
            errors: {},
        }
        const rules = [
            {
              field: 'cateName',
              method: 'isEmpty',
              validWhen: false,
              message: 'This field is required.',
            },
            {
              field: 'cateDescription',
              method: 'isEmpty',
              validWhen: false,
              message: 'This field is required.',
            },
          ];
          this.validator = new validator(rules);
    }

    onChangeDescription(e) {
        this.setState({
            cateDescription: e.target.value
        });
    }

    
    onChangeName(e) {
        this.setState({
            cateName: e.target.value
        });
    }

    createCategory() {
        this.setState({
            errors: this.validator.validate(this.state),
        });
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
        }).then(() => {
            this.props.history.push('/Admin/adminCate')
        }).catch((error) => {
            console.log(error)
        })

    }

    render() {
        const {errors} = this.state;
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
                            <input className="cateName" name="cateName" defaultValue={this.state.cateName} type="text" onChange={this.onChangeName} required/>
                            <label>Category Name</label>
                            {errors.cateName && <div className="validation" style={{display: 'block', color: "red"}}>{errors.cateName}</div>}
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="styled-input wide">
                            <textarea name="cateDescription" defaultValue={this.state.cateDescription} onChange={this.onChangeDescription} required></textarea>
                            <label>Category Description</label>
                            {errors.cateDescription && <div className="validation" style={{display: 'block', color: "red"}}>{errors.cateDescription }</div>}
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div onClick={this.createCategory} className="btn-lrg submit-btn">Create</div>
                    </div>
                </div>
            </div>
        )
    }
}
