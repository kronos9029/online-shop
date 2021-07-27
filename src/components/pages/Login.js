import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import validator from 'validator'
import '../../assets/style/Login.css'


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState("");
    const history = useHistory();

    async function access() {
        const body = {
            'username': username,
            'password': password,
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        let response = await axios.post('http://localhost:8080/public/login', body, { headers })
        localStorage.setItem("auth", response.data.type + " " + response.data.token)
        return response;
    }

    const validateAll = () =>{
        const msg ={}
        if(validator.isEmpty(username) ){
          msg.username= "Please input your username!!!"
        }
        if(validator.isEmpty(password)){
          msg.password= "Please input your password!!!"
        }
        setValidation(msg)
        if(Object.keys(msg).length > 0 ) return false;
        return true;
      }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const authortication = await access();
            sessionStorage.setItem('roleCheck', authortication.data.roles[0])
            if (authortication.data.roles[0] === "ROLE_ADMIN") {
                history.push("/Admin/adminProduct");
            }
            else {
                history.push("/home/main");
            }
        } catch (e) {
            alert("Wrong Password Or Username!!");
        }
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h2 className="active"> Sign In </h2>
                <form>
                    <input type="text" id="login" className="fadeIn second" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <div style={{color : "red"}}>{validation.username}</div>
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <div style={{color : "red"}}>{validation.password}</div>
                    <input type="submit" onClick={(e) => { handleSubmit(e) }} className="fadeIn fourth" value="Log In" />
                    <Link to="/register">
                        <input type="submit" className="fadeIn fourth" value="Register" />
                    </Link>
                </form>
            </div>
        </div>
    );

}


