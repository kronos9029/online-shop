import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom';
import '../../../assets/style/ProductList.scss'
import editPic from '../../../assets/image/edit.png';
import deletePic from '../../../assets/image/delete.png';

export default class ResultList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 3,
            currentPage: 0,
            searchValue: sessionStorage.getItem('searchValue')
        }
        this.getData();
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    modelIns = () => {
        this.setState({ modelIns: !this.state.modelIns });

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })
    }

    getData() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
          };
        axios.get(`http://localhost:8080/products/admin/ByName?productName=${this.state.searchValue}`, { headers })
            .then(res => {
                var tdata = res.data;
                console.log('data-->' + JSON.stringify(tdata))
                var slice = tdata.slice(this.state.offset,
                    this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                })
            });
    }

    delProduct(item) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('auth')
    
        };
        axios.delete(`http://localhost:8080/products/${item.productId}`, { headers })
          .then(() => {
            this.getData();
          }).catch(err => {
            console.log(err);
          })
    
      }

      handleClickUpdateProduct(event, productId) {
        try {
            this.props.history.push("/Admin/updateProduct/" + productId);
            window.location.reload(false);
        } catch (error) {
            alert(error.message);
        }
    }


    render() {
        return (
            <>
                <div className="table-users">
                    <div className="header">Products</div>
                    <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Picture</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Create Date</th>
                            <th>Update Date</th>
                            <th width="230">Product Description</th>
                            <th>Status</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.tableData.map((item) => (
                                <tr key={item.productId}>
                                    <td><img className="adminImg" src={item.image} alt="product"></img></td>
                                    <td>{item.productName}</td>
                                    <td>{item.productPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td>{item.quantity}</td>
                                    <td>{moment(item.createDate).format("MMMM Do YYYY")}</td>
                                    <td>{moment(item.updateDate).format("MMMM Do YYYY")}</td>
                                    <td>{item.productDescription}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {
                                            item.status === "INACTIVE" 
                                            ? null :
                                            <Link  to='/Admin/result'>
                                                <img onClick={this.delProduct.bind(this, item)} className="icon" src={deletePic} alt="delete"></img>
                                            </Link>
                                        }
                                    </td>

                                    <td>
                                        <img onClick={(e) => {(this.handleClickUpdateProduct(e, item.productId))}} className="icon" src={editPic} alt="edit"></img>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>
                <div>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </>
        )
    }
}

