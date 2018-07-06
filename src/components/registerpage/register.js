import React, {Component} from 'react';
import axios from 'axios';

import './register.css';

export default class RegisterPage extends Component {



    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorsText:'',
            username:'',
            email:'',
            password:'',
            passwordRepeat:'',
            loading:false,
            config:{
                token:'8a5da52ed126447d359e70c05721a8aa',
            },
            enpoints:{
                createUser:'http://localhost:8080/api/createuser'
            }
        };
        this.createUser = this.createUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        if(localStorage.getItem('session')){
            this.props.history.push('/todo');
        }

    }

    handleChange(event){
        const name = event.target.name;
        this.setState({
            [name]:event.target.value
        });


    }

    createUser(event){
        event.preventDefault();
        let errors = [];
        let create = true;

        if(this.state.username.toString().trim().length == 0){
            this.state.error = true;
            this.setState({error:true,errorsText:'Please Enter Username'});
            create = false;
            return;
        }
        if(this.state.username.includes('/')||  this.state.username.includes('\\') ){
            this.setState({
                error: true,
                errorsText:'Please Enter Username'
            });
            create = false;
            return;
        }

        if(!this.state.email.includes('@')){
            this.setState({
                error:true,
                errorsText:'Please Enter Valid Email Address'
            });
            create = false;
            return ;

        }

        if(this.state.password.toString().length == 0){
            this.setState({
                error:true,
                errorsText:'Please Enter Password'
            });
            create = false;
            return ;

        }

        if(this.state.password != this.state.passwordRepeat){
            this.setState({
                error:true,
                errorsText:'Please Repeat Password'
            });
            create = false;
            return ;

        }
        if(create){
            this.setState({
                loading:true
            });
            console.log('user creating');


            setTimeout( (time) => {
                axios.get(this.state.enpoints.createUser+'/'+this.state.config.token+'/'+this.state.username+
                    '/'+this.state.email+'/'+this.state.password,{}).then( (response) => {
                    console.log(response);
                    this.setState({
                        loading:false
                    });
                    this.props.history.push('/login');
                }).catch( (error) => {
                    console.log(error);
                });
            },3000);
        }

    }
    render() {
        return (
            <div className="container text-center">
                {
                    this.state.loading &&
                            <img src='imgs/loading.gif'  className="loading"/>

                }
                {
                    this.state.error && <div className="alert alert-danger">
                        <p>{this.state.errorsText.toString()}</p>
                    </div>
                }

                <div className="form-signin">
                    <h2 className="form-signin-heading">Registration</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input name="username"   onChange={this.handleChange} className="form-control" placeholder="Username" required="" autoFocus=""  type="text"  />
                    <br/>
                    <input name="email"  onChange={this.handleChange}  className="form-control" placeholder="Email address" required="" autoFocus=""  type="email" />
                    <br/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input name="password"  onChange={this.handleChange}  className="form-control" placeholder="Password" required=""
                           type="password"/>
                    <br/>
                    <input name="passwordRepeat" onChange={this.handleChange}  className="form-control" placeholder="Repeat Password" required=""
                           type="password"/>
                    <br/>

                    <button className="btn btn-lg btn-primary btn-block" onClick={this.createUser}>Registration</button>
                </div>
            </div>
        );
    }



}