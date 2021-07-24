import React from 'react'
import './CustomerNavbar.scss'
import { Link, useHistory } from "react-router-dom";
export default function CustomerNav() {

    const history = useHistory();

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

    return (
        <div>
            <p className="nav-bar" data-item=''>Admin  page</p>
            <section className="nav-body" >
                <nav>
                    <ul className="menuItems">
                        <div className="dropdown">
                            <li className="dropbtn"><a data-item='Create'>Create</a></li>
                            <div className="dropdown-content">
                                <Link to='/createProduct'>
                                    <a>Product</a>
                                </Link>
                                <Link to='/createCate'>
                                    <a>Category</a>
                                </Link>
                            </div>
                        </div>
                        <li><a href='/#' data-item='Projects'>Projects</a></li>
                        <li><a href='/#' data-item='Blog'>Blog</a></li>
                        {check == "NOT_LOGGED_IN" ?
                            <Link to='/login'>
                                <li><a href='/#' data-item='Login'>Login</a></li>
                            </Link>
                            :
                            <li><a onClick={(e) => {Logout(e)}} data-item='Logout'>Logout</a></li>
                        }
                    </ul>
                </nav>
            </section>
        </div>
    )
}
