import React from 'react'
import './../assets/style/CustomerNavbar.scss'
import { Link, useHistory } from "react-router-dom";

export default function CustomerNav() {

    const history = useHistory();
    const Username = sessionStorage.getItem('username')
    const token = localStorage.getItem("auth");
    let check;
    if (!token) {
        check = "NOT_LOGGED_IN";
    } else {
        check = "LOGGED_IN";
    }

    function Logout(event) {
        event.preventDefault();

        try {
            localStorage.clear();
            sessionStorage.clear();
            history.push("/");
        } catch (e) {
            alert(e.message);
        }
    }

    function handleClickProduct(event) {
        event.preventDefault();
        try {
            history.push("/Admin/adminProduct");
            window.location.reload(false);
        } catch (error) {
            alert(error.message);
        }
    }

    function handleClickCate(event) {
        event.preventDefault();
        try {
            history.push("/Admin/adminCate");
            window.location.reload(false);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <p className="nav-bar" data-item=''>Admin page</p>
            <h4>Welcome, {Username} !!</h4>
            <section className="nav-body" >
                <nav>
                    <ul className="menuItems">
                        <div className="dropdown">
                            <li className="dropbtn"><a href="/#" data-item='Create'>Create</a></li>
                            <div className="dropdown-content">
                                <a href="/Admin/createProduct">Product</a>
                                <a href="/Admin/createCate">Category</a>
                            </div>
                        </div>
                        <li><a href='/Admin/adminProduct' data-item='Products'>Products</a></li>
                        <li><a href='/Admin/adminCate' data-item='Categories'>Categories</a></li>   
                         {
                            check === "NOT_LOGGED_IN" ? null
                            :
                            <li><a href='/#' data-item='Profile'>Profile</a></li>
                        }                       
                        {
                            check === "NOT_LOGGED_IN" ?
                            <Link to='/login'>
                                <li><a href='/#' data-item='Login'>Login</a></li>
                            </Link>
                            :
                            <li><a href="/#" onClick={(e) => {Logout(e)}} data-item='Logout'>Logout</a></li>
                        }
                    </ul>
                </nav>
            </section>
        </div>
    )
}
