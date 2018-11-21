import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Navbar extends Component {

    onSignout(event){

        event.preventDefault();

        this.props.signout();

    }

    render() {

        return (

            <div>

                <header class="app-header header">
                
                    {/* <!-- Header Background Animation--> */}
                    <div id="canvas" class="gradient"></div>
                    
                    {/* <!-- Navbar Top --> */}
                    <div class="container-fluid">
                        <div class="d-flex">
                            <a class="header-brand" href="index.html">
                                <img alt="ren logo" class="header-brand-img" src="./logo2.png"></img>
                            </a>
                            <a aria-label="Hide Sidebar" class="app-sidebar__toggle" data-toggle="sidebar" href=""></a>
                            <div class="d-flex order-lg-2 ml-auto">

                                <div class="dropdown d-none d-md-flex">
                                    <a class="nav-link icon" data-toggle="dropdown">
                                        <i class="fas fa-bell"></i>
                                        <span class="nav-unread bg-danger"></span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">

                                        {/* <!-- First Notification --> */}
                                        <a class="dropdown-item d-flex pb-3" href="">
                                            <div class="notifyimg">
                                                <i class="fas fa-thumbs-up"></i>
                                            </div>
                                            <div>
                                                <strong>Portfolio Status: Excellent</strong>
                                                <div class="small text-muted">
                                                    3 hours ago
                                                </div>
                                            </div>
                                        </a>
                                        
                                        {/* <!-- View All Notifications --> */}
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item text-center text-muted-dark" href="">View all Notifications</a>

                                    </div>
                                </div>

                                <div class="dropdown">
                                    <a class="nav-link pr-0 leading-none d-flex" data-toggle="dropdown" href="">
                                        <span class="avatar avatar-md brround" ></span>
                                        <span class="ml-2 d-none d-lg-block">
                                            <span class="text-white">Matthew Fisher</span>
                                        </span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                        <a class="dropdown-item" href=""><i class="dropdown-icon mdi mdi-account-outline"></i> Profile</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href=""><i class="dropdown-icon mdi mdi-compass-outline"></i>Getting Started</a>
                                        <a class="dropdown-item" href="login.html" onClick={this.onSignout.bind(this)}><i class="dropdown-icon mdi mdi-logout-variant"></i> Sign out</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {errorMessage: state.auth.errorMessage};
}

export default connect(mapStateToProps, actions)(Navbar)