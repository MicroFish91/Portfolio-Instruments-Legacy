import React, { Component } from 'react';

import {Route} from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login/Login';
import CreateAccount from './Login/CreateAccount';


// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/dashboard.css';

class Main extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (

            <div>

                <Route path="/dashboard" component={Dashboard} />

                <Route exact path="/" component={Login} />

                <Route exact path="/createAccount" component={CreateAccount} />
                
            </div>
        )
    }
}

export default Main;