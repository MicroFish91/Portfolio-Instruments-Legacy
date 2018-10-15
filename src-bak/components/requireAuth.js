import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {

    class ComposedComponent extends Component {

        constructor(props){
            super(props);
        }

        // After initial render
        componentWillMount() {
            this.shouldNavigateAway();
        }

        // After props update and subsequent renders
        componentDidUpdate(){
            this.shouldNavigateAway(); 
        }

        // If no auth token
        shouldNavigateAway(){

            if (!this.props.auth){
                this.props.history.push('/');
            }

        }

        render(){
            return (
                <div>
                    <ChildComponent {...this.props} />
                </div>
            );
        }

    }

    function mapStateToProps(state) {
        return { auth: state.auth.authenticated };
    }
    
    return connect(mapStateToProps)(ComposedComponent);

}


