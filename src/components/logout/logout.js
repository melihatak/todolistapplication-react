import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class Logout extends Component{

    constructor(props){
        super(props);
        this.logout();

    }

    render(){
        return(
           <h2 className="text-center"> Logging Out.. </h2>
        )
    }
    logout(){
        setTimeout( (time) => {
            localStorage.removeItem('session');
            this.props.history.push('/login');
        },3000);
    }



}