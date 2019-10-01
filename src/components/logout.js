import React, { Component } from 'react'
import  { alertmesage }  from './alertMessage';
import {userApi} from '../api/userApi';

export class logout extends Component {


    componentDidMount(){
        console.log("componentDIDsMount")
        console.log(sessionStorage.getItem("email"))
        if(sessionStorage.getItem("email")){
            sessionStorage.clear()
            
        var url = "http://localhost:5005/user/logout";
        var bearer =  sessionStorage.getItem("token");
        fetch(url, {
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                header: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            }).then(responseJson => {
                // var items = JSON.parse(responseJson._bodyInit);
                console.log(responseJson)
            })
            .catch(error => {
             console.log("object erooroorororooorroro")
            });
            this.props.history.push("/");
            alertmesage.createNotification(201,"Logged out Successfully")
        }else{
            this.props.history.push("/");
            alertmesage.createNotification(500,"Please Login to Access")
        }

      }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default logout
