import React, { PureComponent } from 'react'
import './ProductCard.css'
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export class ProductCard extends PureComponent {

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
            <>
                {
                    this.state.tableData.map((item) =>(
                        <button className="cardBtn" key={item.productId}>
                        <div className="container page-wrapper">
                            <div className="page-inner">
                                <div className="row">
                                    <div className="el-wrapper">
                                        <div className="box-up">
                                            <img className="img" src={item.image} alt="product" />
                                            <div className="img-info">
                                                <div className="info-inner">
                                                    <span className="p-name">{item.productName}</span>
                                                    <span className="p-company">{item.categoryName}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box-down">
                                            <div className="h-bg">
                                            </div>

                                            <a className="cart" href="/#">
                                                <span className="price">{item.productPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                                <span className="add-to-cart">
                                                    <span className="txt">Add in cart</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                    ))
                }

                <div className="paging">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"paginationCard"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </>
        )
    }
}

export default ProductCard

