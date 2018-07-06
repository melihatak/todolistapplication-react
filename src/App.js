import './App.css';
import React, {Component} from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginPage from "./components/loginpage/login";
import RegisterPage from "./components/registerpage/register";
import TodoPage from './components/todo/todo';
import Logout from './components/logout/logout';


export default class App extends Component {
    render(){
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Main Page</Link>
                        </li>
                        {
                            !localStorage.getItem('session') && <li>
                                <Link to="/login">Login</Link>
                            </li>

                        }
                        {
                            !localStorage.getItem('session') && <li>
                                <Link to="/register">Registration</Link>
                            </li>

                        }
                        {
                            localStorage.getItem('session') &&<li>
                                <Link to="/logout">Logout</Link>
                            </li>

                        }

                    </ul>

                    <hr />

                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/todo" component={TodoPage}/>
                    <Route path="/logout" component={Logout}/>
                </div>
            </Router>
        );
    }
}
