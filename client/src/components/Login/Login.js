import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import { reduxForm, Field } from 'redux-form';

import * as actions from '../../actions';

//import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/dashboard.css'

class Login extends Component {

    constructor(props){
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}
	
	onChangeUsername(e){
		this.setState({username: e.target.value});
	}

	onChangePassword(e){
		this.setState({password: e.target.value});
	}

	onLogin(e){

		e.preventDefault();

		localStorage.setItem('user', this.state.username);

		this.props.signin({userName: this.state.username, userPassword: this.state.password}, () => {
            this.props.history.push('/dashboard');
        });

	}

    render() {

        return (
        
        <div>

        <div id="particles-js" className=""></div>

        {/* <div id="global-loader"><div className="showbox"><div  className="lds-ring"><div></div><div></div><div></div><div></div></div></div></div> */}

		<div className="page">
			<div className="page-single">
				<div className="container">
					<div className="row">
						<div className="col col-login mx-auto">
							<div className="text-center mb-6 ">
								<img src="" className="h-6" alt=""></img>
							</div>
							<form className="card" method="post">
								<div className="card-body p-6">
									<div className="card-title text-center">Login to your Account</div>
									<div className="form-group">
										<label className="form-label">Email address</label>
										<input type="email" className="form-control" id="exampleInputEmail1"  placeholder="Enter email" value={this.state.username} onChange={this.onChangeUsername.bind(this)}></input>
									</div>
									<div className="form-group">
										<label className="form-label">Enter Password
										</label>
										<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password} onChange={this.onChangePassword.bind(this)}></input>
									</div>
									<div className="form-footer">
                                    <button className="btn btn-primary btn-block" onClick={this.onLogin.bind(this)}><Link to="/dashboard">Sign in</Link></button>
									</div>
									<div className="text-center text-muted mt-3">
										Don't have account yet? <Link to="/createAccount">Create Account </Link>
									</div>
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

		{this.props.errorMessage}

        </div>    
        )
    }

}

function mapStateToProps(state){
    return {errorMessage: state.auth.errorMessage};
}

export default connect(mapStateToProps, actions)(Login)