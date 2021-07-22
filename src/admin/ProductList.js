import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './ProductList.scss';
import editPic from '../assets/edit.png';
import deletePic from '../assets/delete.png';

// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ProductList extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 3,
            currentPage: 0
            // modelIns: false

        }


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

    componentDidMount() {
        this.getData();
    }
    getData() {
        // localStorage.getItem("auth")
        axios
            .get('http://localhost:8080/products')
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


    render() {
        return (
            <div class="table-users">
                <div class="header">Products</div>

                <table cellspacing="0">
                    <tr>
                        <th>Picture</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Create Date</th>
                        <th>Update Date</th>
                        <th width="230">Product Description</th>
                        <th></th>
                    </tr>

                    {
                        this.state.tableData.map((item) => (
                            <tr key={item.productId}>
                                <td><img src={item.image} alt="product"></img></td>
                                <td>{item.productName}</td>
                                <td>{item.productPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                <td>{item.quantity}</td>
                                <td>{moment(item.createDate).format("MMMM Do YYYY")}</td>
                                <td>{moment(item.updateDate).format("MMMM Do YYYY")}</td>
                                <td>{item.productDescription}</td>
                                <td>
                                    <Router>
                                        <img class="icon" src={editPic} alt="edit"></img>
                                        <Link to={`/create/${item.productId}`}>
                                            <img  class="icon" src={deletePic} alt="delete"></img>
                                        </Link>
                                    </Router>

                                </td>
                            </tr>
                        ))
                    }
                </table>

                <div className="commentBox">
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

            </div>
        )

    }
}


export default ProductList;