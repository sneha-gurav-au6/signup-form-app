import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/actions/setAuthToken";
import { setCurrentUser } from "./redux/actions/userAction";

import { connect } from "react-redux";
import SignUp from "./components/SignUp";

import NextSignUpPage from "./components/NextSignUpPage";

import "./App.css";

class App extends Component {
    componentDidMount() {
        // Check for token
        if (localStorage.jwtToken) {
            // Set token to Auth header
            setAuthToken(localStorage.jwtToken);
            // Decode jwt token
            const decode = jwt_decode(localStorage.jwtToken);
            // Set user and isAuthenticated
            this.props.setCurrentUser(decode);
        }
    }
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={SignUp} />
                    <Route
                        exact
                        path="/next_signup_page"
                        component={NextSignUpPage}
                    />
                </Switch>
            </div>
        );
    }
}

export default connect(null, { setCurrentUser, setAuthToken })(App);
