import React, { Component } from 'react'
import axios from 'axios';
import '../../../assets/style/UpdateCategory.css'

export default class UpdateCategory extends Component {

    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updateCategory = this.updateCategory.bind(this);

        this.state = {
            cateId: null,
            cateName: '',
            cateDescription: '',
    };
    }
    componentDidMount() {
        this.getCategory(this.props.match.params.id);
      }
      getCategory(cateId){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
          };
            axios
              .get(`http://localhost:8080/categories/${cateId}` , {headers})
              .then(res => {                
                this.setState({
                    cateId : res.data.cateId,
                    cateName : res.data.cateName,
                    cateDescription : res.data.cateDescription
                })
              });
          
      }
      updateCategory() {
        var data = {
          cateName: this.state.cateName,
          cateDescription: this.state.cateDescription,
        }; 
        console.log(data);
        const headers = {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth')
              };
        
    axios.put(`http://localhost:8080/categories/${this.state.cateId}`, 
    data, { headers }).then(() => {
        alert("Update Suscessfully");
        this.props.history.push('/Admin/adminCate')
    }).catch((error) => {
        console.log(error)
    })}
      onChangeName(e) {
        this.setState({
            cateName: e.target.value
        });
    }
    
    onChangeDescription(e) {
        this.setState({
            cateDescription: e.target.value
        });
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
                            <input className="cateName" name="cateName" defaultValue={this.state.cateName} type="text" onChange={this.onChangeName} required/>
                            <label>Category Name</label>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="styled-input wide">
                            <textarea name="cateDescription" defaultValue={this.state.cateDescription} onChange={this.onChangeDescription} required></textarea>
                            <label>Category Description</label>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div onClick={this.updateCategory} className="btn-lrg submit-btn">Update</div>
                    </div>
                </div>
            </div>
        )
    }
}
