import React from 'react'
import './../assets/style/CustomerNavbar.scss'
import { Link, useHistory } from 'react-router-dom';

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
      <p className="nav-bar" data-item=''>Online Shop</p>
      <section>
        <nav className="nav-body">
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
            {
              check === "NOT_LOGGED_IN" ? <li><a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley' data-item='About'>About</a></li>
                :
                <li><a href='/#' data-item='Profile'>Profile</a></li>
            }
            {check === "NOT_LOGGED_IN" ?
              <Link to='/login'>
                <li><a href='/#' data-item='Login'>Login</a></li>
              </Link>
              :
              <li><a onClick={(e) => { Logout(e) }} data-item='Logout'>Logout</a></li>
            }
          </ul>
        </nav>
      </section>
    </div>
  )
}
