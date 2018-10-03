import React, { Component } from 'react';

import {Route} from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login/Login';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/dashboard.css';

class Main extends Component {

    render() {

        return (

            <div>

                <Route path="/dashboard" component={Dashboard} />

                <Route exact path="/" component={Login} />
                
            </div>
        )
    }
}

export default Main;