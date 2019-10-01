import React, { Component } from 'react';
import  { alertmesage }  from './alertMessage'; 
import {userApi} from '../api/userApi';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: "" ,
            lastName: "" ,
            email: "",
            password: "",
            confirmPassword : ""
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmitForm =  this.handleSubmitForm.bind(this);
        // this.handleUpdateUser =  this.handleUpdateUser.bind(this);
    }

    //Update value in state on type something in Input Fields.
    handleChange = (event) => {
        console.log(event.target.value);
        //[event.target.name] for getting value from form with refernece of name properties
        this.setState({
            [event.target.name]: event.target.value
        })
        event.preventDefault();
    }

    //Method for Submit Form.
     handleSubmitForm = async (event) =>{
        event.preventDefault();
        console.log("object")
        console.log(this.state.firstName)
        if(this.state.password != this.state.confirmPassword){
            alertmesage.createNotification(400,"Password and Confirm Password Should be the same.")
            return "";
        }
        if(this.state.firstName && this.state.email && this.state.password && this.state.confirmPassword){
            const res = await userApi.addUser(this.state)
 
            // //for redirecting home page
            console.log(res);
            if(res.status == 201){
                this.setState({
                    firstName: "" ,
                    lastName: "" ,
                    email: "",
                    password: "",
                    confirmPassword : ""
                   });
                this.props.history.push("/");
                alertmesage.createNotification(res.status,"Signed Up Successfully")
                
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
                <p className="h4 mb-4">Sign up</p>
                <div className="form-row mb-4">
                    <div className="col">
                        <input type="text" id="firstName" className="form-control" placeholder="First name" value={this.state.firstName} onChange={this.handleChange} name="firstName"/>
                    </div>
                    <div className="col">
                        <input type="text" id="lastName" className="form-control" placeholder="Last name" value={this.state.lastName} onChange={this.handleChange} name="lastName"/>
                    </div>
                </div>
                <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" value={this.state.email} onChange={this.handleChange} name="email"/>
                <input type="password" id="password" className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" value={this.state.password} onChange={this.handleChange} name="password"/>

                <small id="defaultRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
                    At least 8 characters and 1 digit
                </small>
                <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" value={this.state.confirmPassword} onChange={this.handleChange} name="confirmPassword"/>
                <button className="btn btn-info my-4 btn-block btn-sm" type="submit" onClick = {this.handleSubmitForm}>Sign Up</button>
            </div>
        </form>
           
        )
    }
}


export default Signup;

//creating className component rcc
//for shortcut es7 extension we have to add.