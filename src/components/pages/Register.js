import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator'
import '../../assets/style/Register.css';


export default function Register(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [validation, setValidation] = useState("");
  
  
    async function register() {
  
      const body = {
        'username': username,
        'password': password,
        'address': address,
        'phone': phone,
        'fullname': fullName,
        'email': email,
      }
      let response = await axios.post('http://localhost:8080/public/register', body)
      return response;
    }
    const validateAll = () => {
      const msg = {}
      if (validator.isEmpty(email)) {
        msg.email = "Please input your email!!!"
      }
      if(!validator.isEmail(email)){
        msg.email = "Invalid Email!!"
      }
      if (validator.isEmpty(username)) {
        msg.username = "Please input your username!!!"
      }
      if (validator.isEmpty(phone)) {
        msg.phone = "Please input your phone!!!"
      }
      if(!validator.isMobilePhone(phone)){
        msg.phone = "Invalid Phone Number!!"
      }
      if (validator.isEmpty(address)) {
        msg.address = "Please input your address!!!"
      }
      if (validator.isEmpty(fullName)) {
        msg.fullName = "Please input your fullname!!!"
      }
      if(!validator.matches(fullName, /^[a-z A-Z]+$/)){
        msg.fullName = "Name Contain Only Letters!!"
      }
      if (validator.isEmpty(password)) {
        msg.password = "Please input your password!!!"
      }
  
      setValidation(msg)
      if (Object.keys(msg).length > 0) return false;
      return true;
    }
    async function handleSubmit(event) {
  
      event.preventDefault();
      const isValid = validateAll();
        const authortication = await register();
        console.log(authortication.data);
    
  
    }
    
        return (
            <div className="container">
                <div className="title">Registration</div>
                <div className="content">
                    <form>
                        <div>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Full Name</span>
                                    <input type="text" placeholder="Enter your name" name="fullName" onChange={(e) => setFullName(e.target.value)} required/>
                                    <div style={{ color: "red" }}>{validation.fullName}</div>
                                </div>
                                <div className="input-box">
                                    <span className="details">Username</span>
                                    <input type="text" placeholder="Enter your username" name="username" onChange={(e) => setUsername(e.target.value)} required />
                                    <div style={{ color: "red" }}>{validation.username}</div>
                                </div>
                                <div className="input-box">
                                    <span class="details">Email</span>
                                    <input type="text" placeholder="Enter your email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                                    <div style={{ color: "red" }}>{validation.email}</div>
                                </div>
                                <div className="input-box">
                                    <span class="details">Phone Number</span>
                                    <input type="text" placeholder="Enter your number" name="phone" onChange={(e) => setPhone(e.target.value)}  required/>
                                    <div style={{ color: "red" }}>{validation.phone}</div>
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input type="text" placeholder="Enter your address" name="address" onChange={(e) => setAddress(e.target.value)} required/>
                                    
                                    <div style={{ color: "red" }}>{validation.address}</div>
                                </div>
                                
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input type="password" placeholder="Enter your password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                                    <div style={{ color: "red" }}>{validation.password}</div>
                                </div>
                            </div>
                            <Link to='/login'>
                                <div className="button">
                                    <input onClick={(e) => { handleSubmit(e) }} type="submit" value="Register" />
                                </div>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    
}