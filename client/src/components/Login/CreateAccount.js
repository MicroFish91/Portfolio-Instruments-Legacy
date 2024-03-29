import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push("/");
    });
  };

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
              name="userName"
              type="text"
              component="input"
              autoComplete="none"
            />
          </fieldset>

          <fieldset>
            <label>Password</label>
            <Field
              name="userPassword"
              type="password"
              component="input"
              autoComplete="none"
            />
          </fieldset>

          <button>Sign Up</button>

          {this.props.errorMessage}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "createAccount" })
)(CreateAccount);
