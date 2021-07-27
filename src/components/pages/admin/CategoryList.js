import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import editPic from '../../../assets/image/edit.png';
import deletePic from '../../../assets/image/delete.png';

export default class CategoryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 3,
      currentPage: 0,
    }
    this.getData();
    this.handlePageClick = this.handlePageClick.bind(this);
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
    axios.get('http://localhost:8080/categories', { headers })
      .then(res => {
        if (res.status === 200) {
          var tdata = res.data;
          console.log('data-->' + JSON.stringify(tdata))
          var slice = tdata.slice(this.state.offset,
            this.state.offset + this.state.perPage)
          this.setState({
            pageCount: Math.ceil(tdata.length / this.state.perPage),
            orgtableData: tdata,
            tableData: slice
          })
        }
      });
  }

  delCategory(item) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('auth')

    };

    axios.delete(`http://localhost:8080/categories/${item.cateId}`, { headers })
      .then(res => {
        this.getData();
        alert("Delete Successfully")
      }).catch(err => {
        console.log(err);
      })

  }

  handleClickUpdateCate(event, cateId) {
    event.preventDefault();
    try {
      this.props.history.push("/updateCate/" + cateId);
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
                  <th>Category Name</th>
                  <th>Category Description</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.tableData.map((item) => (
                    <tr key={item.cateId}>
                      <td>{item.cateName}</td>
                      <td>{item.cateDescription}</td>
                      <td>
                        <Link to='/Admin/adminCate'>
                          <img onClick={this.delCategory.bind(this, item)} className="icon" src={deletePic} alt="delete"></img>
                        </Link>
                      </td>
                      <td>
                        <img onClick={(e) => { (this.handleClickUpdateCate(e, item.cateId)) }} className="icon" src={editPic} alt="edit"></img>
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
