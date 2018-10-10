import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CreateAccount extends Component {

    constructor(props){
        super(props);
    }

    onSubmit = formProps => {
        console.log(formProps);
        this.props.signUp(formProps);
    }

    render() {

        const { handleSubmit } = this.props; 

        //this is supplied by redux-form
        //it will provide the props about the form state and function 
        // to handle the submit process.

        return (
            
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <fieldset>
                        <label>Email</label>
                        <Field
                            name="email"
                            type="text"
                            component="input"
                            autoComplete="none"
                        />
                    </fieldset>

                    <fieldset>
                        <label>Password</label>
                        <Field
                            name="password"
                            type="password"
                            component="input"
                            autoComplete="none"
                        />
                    </fieldset>

                    <button>Sign Up</button>
                </form>
            </div>
        )       
    }
}

export default compose(
    connect(null, actions),
    reduxForm({form: 'createAccount'})
) (CreateAccount)
