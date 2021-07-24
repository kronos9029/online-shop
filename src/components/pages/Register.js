import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from "validator";
import axios from 'axios';
import '../../components/Register.css';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vemail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};


const vphone = value => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (!pattern.test(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter only number.
            </div>
        );
    } else if (value.length !== 10) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter valid phone number.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onChangephone = this.onChangephone.bind(this);
        this.onChangefullName = this.onChangefullName.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.createAccount = this.createAccount.bind(this);

        this.state = {
            password: '',
            address: '',
            phone: '',
            fullName: '',
            email: '',
            username: '',
        }
    }

    onChangeusername(e) {
        this.setState({
            username: e.target.value,

        });
    }
    onChangeemail(e) {
        this.setState({
            email: e.target.value,

        });
    }
    onChangephone(e) {
        this.setState({
            phone: e.target.value,

        });
    }
    onChangefullName(e) {
        this.setState({
            fullName: e.target.value,

        });
    }
    onChangepassword(e) {
        this.setState({
            password: e.target.value,

        });
    }
    onChangeaddress(e) {
        this.setState({
            address: e.target.value,

        });
    }

    createAccount() {
        var Account = {
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone,
            fullName: this.state.fullName,
            email: this.state.email,
            username: this.state.username,
        };
        console.log(Account);
        axios.post('http://localhost:8080/public/register', Account)
        return Account;
    }

    render() {
        return (
            <div className="container">
                <div className="title">Registration</div>
                <div className="content">
                    <form>
                            <div>
                                <div className="user-details">
                                    <div className="input-box">
                                        <span className="details">Full Name</span>
                                        <input type="text" placeholder="Enter your name" name="fullName" value={this.state.fullName} onChange={this.onChangefullName} validations={[required]} />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Username</span>
                                        <input type="text" placeholder="Enter your username" name="username" value={this.state.username} onChange={this.onChangeusername} validations={[required, vusername]} />
                                    </div>
                                    <div className="input-box">
                                        <span class="details">Email</span>
                                        <input type="text" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.onChangeemail} validations={[required, vemail]} />
                                    </div>
                                    <div className="input-box">
                                        <span class="details">Phone Number</span>
                                        <input type="text" placeholder="Enter your number" name="phone" value={this.state.phone} onChange={this.onChangephone} validations={[required, vphone]} />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Address</span>
                                        <input type="text" placeholder="Enter your address" name="address" value={this.state.address} onChange={this.onChangeaddress} validations={[required]} />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Password</span>
                                        <input type="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChangepassword} validations={[required, vpassword]} />
                                    </div>
                                </div>
                                <Link to='/login'>
                                    <div className="button">
                                        <input onClick={this.createAccount} type="submit" value="Register" />
                                    </div>
                                </Link>
                            </div>
                    </form>
                </div>
            </div>
        );
    }
}