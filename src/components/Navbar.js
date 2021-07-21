import React from 'react';
import './NavBar.scss';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><a href="#0">Products</a></li>
                <li><a href="#0">Categories</a></li>
                <li>
                    <a href="#0">Service</a>
                    <ul>
                        <li><a href="#0">Create Product</a></li>
                        <li><a href="#0">Create Category</a></li>
                    </ul>
                </li>
                <li><a href="#0">Logout</a></li>
            </ul>
        </nav>
    )
}
