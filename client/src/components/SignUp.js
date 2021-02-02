import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUsers } from "./../redux/actions/userAction";
import Logo from "./Logo";
import "./style/signup.css";

export class SignUp extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",

        country: "",
        password: "",
    };

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
    };

    handleNext = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: "/next_signup_page",
            store: this.state,
        });
    };

    handleLogin = (e) => {
        e.preventDefault();
        const data = this.state;
        this.props.loginUsers(data);
    };
    render() {
        const { errors } = this.props.auth;

        return (
            <>
                <Logo />
                <div className="main">
                    <div className="main-div">
                        <form className="forms" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail4"
                                        name="email"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Country</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="country"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div class="form-group col-md-12">
                                    <label for="inputPassword4">Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5"></div>
                                <div class="form-group col-md-4">
                                    <button
                                        class="btn btn-warning"
                                        onClick={this.handleNext}
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="form-group col-md-3"></div>
                            </div>
                            <div className="form-row login">
                                <div class="form-group ">
                                    <label>Already have account??</label>

                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        onClick={this.handleLogin}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

const mapstateToProps = (state) => {
    return { auth: state };
};
export default connect(mapstateToProps, { loginUsers })(withRouter(SignUp));
