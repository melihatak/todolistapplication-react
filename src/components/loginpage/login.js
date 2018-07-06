import React, {Component} from 'react';
import './login.css';
import axios from 'axios';

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            error:false,
            errorText:'',
            username:'',
            password:'',
            loading:false,
            config:{
                token:'8a5da52ed126447d359e70c05721a8aa'
            },
            enpoints:{
                loginUser:'http://localhost:8080/api/loginuser'
            }
        }
        if(localStorage.getItem('session')){
            this.props.history.push('/todo');
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        this.setState({
            [name]:event.target.value
        });


    }

    loginUser(){
        if(this.state.username.trim().length == 0 ){
            this.setState({
                error:true,
                errorText:'Please Enter Username'
            });
            return;
        }
        if(this.state.password.trim().length == 0 ){
            this.setState({
                error:true,
                errorText:'Please Enter Password'
            });
            return;

        }
        this.setState({
            loading:true
        });

        setTimeout( (time) => {
            axios.get(this.state.enpoints.loginUser+'/'+this.state.config.token+'/'+this.state.username+'/'+this.state.password,{})
                .then( ( response) => {
                        let data = response.data;
                        console.log(data);
                        if(data.success){
                            this.props.history.push('/todo');
                            localStorage.setItem('session',true);
                        }else{
                            alert('Username Or Password is wrong');
                        }
                    this.setState({
                        loading:false
                    });
                }).catch( (error)  => {
                console.log(error);
            });
        },3000)

    }
    render() {
        return (
            <div className="container text-center">
                {
                    this.state.error && <div className="alert alert-danger">{this.state.errorText.toString()}</div>
                }
                {
                    this.state.loading &&
                    <img src='imgs/loading.gif'  className="loading"/>

                }
                <div className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input name="username"  onChange={this.handleChange} className="form-control" placeholder="Username" required="" autoFocus=""  type="text" />
                     <br/>
                     <label htmlFor="inputPassword" className="sr-only">Password</label>
                     <input name="password" onChange={this.handleChange} className="form-control" placeholder="Password" required=""
                               type="password"/>
                     <br/>
                     <button className="btn btn-lg btn-primary btn-block"  onClick={this.loginUser}>Sign in</button>
                </div>
            </div>
        )
    }


}