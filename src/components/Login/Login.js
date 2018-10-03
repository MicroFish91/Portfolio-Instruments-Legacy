import React, { Component } from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import initializeUser from '../../actions/initializeUser';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/dashboard.css'

class Login extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
        
        <div>

        <div id="particles-js" class=""></div>

        <div id="global-loader"><div class="showbox"><div  class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div>

		<div class="page">
			<div class="page-single">
				<div class="container">
					<div class="row">
						<div class="col col-login mx-auto">
							<div class="text-center mb-6 ">
								<img src="" class="h-6" alt=""></img>
							</div>
							<form class="card" method="post">
								<div class="card-body p-6">
									<div class="card-title text-center">Login to your Account</div>
									<div class="form-group">
										<label class="form-label">Email address</label>
										<input type="email" class="form-control" id="exampleInputEmail1"  placeholder="Enter email"></input>
									</div>
									<div class="form-group">
										<label class="form-label">Password
											<a href="./forgot-password.html" class="float-right small">I forgot password</a>
										</label>
										<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
									</div>
									<div class="form-group">
										<label class="custom-control custom-checkbox">
											<input type="checkbox" class="custom-control-input" />
											<span class="custom-control-label">Remember me</span>
										</label>
									</div>
									<div class="form-footer">
                                    <button class="btn btn-primary btn-block" onClick={
                                        (e) => {
											e.preventDefault();
											this.props.onInitializeUser("Matt");
                                        }
                                    }><Link to="/dashboard">Sign in</Link></button>
									</div>
									<div class="text-center text-muted mt-3">
										Don't have account yet? <a href="./register.html">Sign up</a>
									</div>
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

        </div>    
        )
    }

}


// Map Actions
function mapDispatchToProps(dispatch){
    
    return {
        onInitializeUser: (user) => dispatch(initializeUser(user))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Login);