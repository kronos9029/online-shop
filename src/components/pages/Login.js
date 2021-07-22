import React, { useState } from 'react'
import axios from 'axios';
import '../Login.css'

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
    }
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h2 className="active"> Sign In </h2>
                <form>
                    <input type="text" id="login" className="fadeIn second" name="login" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" onClick={access} className="fadeIn fourth" value="Log In" />
                    <input type="submit" className="fadeIn fourth" value="Register" />
                </form>
                


            </div>
        </div>
    );

}


