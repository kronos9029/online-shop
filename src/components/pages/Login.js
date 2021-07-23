import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import '../Login.css'


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const authortication = await access();
            if (authortication.data.roles[0] === "ROLE_ADMIN") {
                history.push("/Admin");
            }
            else {
                history.push("/");
            }
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h2 className="active"> Sign In </h2>
                <form>
                    <input type="text" id="login" className="fadeIn second" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" onClick={(e) => { handleSubmit(e) }} className="fadeIn fourth" value="Log In" />
                    <input type="submit" className="fadeIn fourth" value="Register" />
                </form>
            </div>
        </div>
    );

}


