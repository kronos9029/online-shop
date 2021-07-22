import React from 'react'
import './CustomerNavbar.scss'
export default function CustomerNav() {
    return (
        <div>
            <p className="nav-bar" data-item=''>Admin  page</p>
            <section className="nav-body" >
                <nav>
                    <ul className="menuItems">
                        <div class="dropdown">
                            <li className="dropbtn"><a href='/#' data-item='Create'>Create</a></li>
                            <div class="dropdown-content">
                                <a href="/#">Product</a>
                                <a href="/#">Category</a>
                            </div>
                        </div>
                        <li><a href='/#' data-item='Projects'>Projects</a></li>
                        <li><a href='/#' data-item='Blog'>Blog</a></li>
                        <li><a href='/#' data-item='Contact'>Contact</a></li>
                    </ul>
                </nav>
            </section>
        </div>
    )
}
