import React from 'react'
import './CustomerNavbar.scss'
export default function CustomerNav() {
  return (
    <div>
      <p className="nav-bar" data-item=''>Online Shop</p>
      <section>
        <nav  className="nav-body">
          <ul className="menuItems">
            <li><a href='/#' data-item='Home'>Home</a></li>
            <div className="dropdown">
              <li className="dropbtn"><a href='/#' data-item='Categories'>Categories</a></li>
              <div className="dropdown-content">
                <a href="/#">Drinks</a>
                <a href="/#">Foods</a>
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
