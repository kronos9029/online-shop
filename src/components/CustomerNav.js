import React from 'react'
import './CustomerNavbar.scss'
export default function CustomerNav() {
  return (
    <div>
      <p className="nav-bar" data-item=''>Online Shop</p>
      <section className="nav-body" >
        <nav>
          <ul className="menuItems">
            <li><a href='/#' data-item='Home'>Home</a></li>
            <li><a href='/#' data-item='About'>About</a></li>
            <li><a href='/#' data-item='Projects'>Projects</a></li>
            <li><a href='/#' data-item='Blog'>Blog</a></li>
            <li><a href='/#' data-item='Contact'>Contact</a></li>
          </ul>
        </nav>
      </section>
    </div>
  )
}
