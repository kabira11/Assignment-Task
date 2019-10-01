import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {userApi} from '../api/userApi';
import  { alertmesage }  from './alertMessage';

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        // this.handleSubmitForm =  this.handleSubmitForm.bind(this);
        // this.handleChange =  this.handleChange.bind(this);

    }

    handleChange = (event) => {
        console.log(event.target.value);
        //[event.target.name] for getting value from form with refernece of name properties
        this.setState({
            [event.target.name]: event.target.value
        })
        event.preventDefault();
    }

     handleSubmitForm = async (event) => {
        event.preventDefault();

        
        // this.setState({
        //     email: "" ,
        //     password: "" 
        // });
        // this.props.history.push("/signup");

        if(this.state.email && this.state.password){
            // const res = await loginApi.loginCheck(this.state)
            const res = await userApi.login(this.state)
 
            // // //for redirecting home page
            // console.log(res);
            if(res.status == 201){
                console.log("0000000000000000000000000000");
                console.log(res);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("email", res.data.user.email);
                sessionStorage.setItem("name", res.data.user.firstName);
                this.setState({
                    email: "" ,
                    password: "" 
                });
                // console.log(sessionStorage.getItem("email"))
                this.props.history.push("/profile");
                alertmesage.createNotification(res.status,"Logged in Successfully")
                
            }else{
                alertmesage.createNotification(res.status,res.message)
            }

        }else{
            //Alert message
            alertmesage.createNotification(400,"Did you miss filling some field.")
        }

     }

    render() {
        return (
        <form className="text-center border border-light p-5" onSubmit={this.handleSubmitForm}>
            <div className = "col-md-4 offset-md-4">
                <p className="h4 mb-4">Log In</p>
                <input type="email" id="defaultRegisterFormEmail" className="form-control mb-4" onChange={this.handleChange} placeholder="E-mail" name="email"/>
                <input type="password" id="defaultRegisterFormPassword" className="form-control" onChange={this.handleChange} placeholder="Password" name="password" aria-describedby="defaultRegisterFormPasswordHelpBlock"/>
                <p>Not a member?
          
                    <Link 
                        to={{pathname :`/signup` 
                      }}> Sign UP
                    </Link>
                        Register
                </p>
                <button className="btn btn-info my-4 btn-block btn-sm" type="submit" onClick={this.handleSubmitForm}>Sign In</button>
            </div>
        </form>
        )
    }
}

export default Login;


//creating class component rcc
//for shortcut es7 extension we have to add.