import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import "./style/newpage.css";
import Logo from "./Logo";
import { RegisterUsers } from "./../redux/actions/userAction";

class NextSignUpPage extends Component {
    state = {
        organization: "",
        no_of_staff: "",
        phone_no: "",
    };
    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);
    };

    handleClick = async (e) => {
        e.preventDefault();
        const previousObject = this.props.history.location.store;
        const currentObject = this.state;
        console.log(previousObject);
        console.log(currentObject);
        const newObject = { ...previousObject, ...currentObject };
        console.log(newObject);
        //    const data = await axios.post("/user/register", newObject);

        //    console.log(data.data);
        const error = this.props.RegisterUsers(newObject);
        console.log(error);
    };

    render() {
        console.log(this.props.history.location.store);
        const { errors } = this.props.auth;
        console.log(this.props.auth.errors.message);
        console.log(this.props.auth.errors.data);

        return (
            <>
                <Logo />
                <div className="second-page-main-div">
                    <div className="sub-div">
                        <form className="forms" onSubmit={this.handleSubmit}>
                            <h5>Few Final Details</h5>
                            <div className="row">
                                <div className="col">
                                    <label>Orgnization</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="organization"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col">
                                    <label>No of staff</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="no_of_staff"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label for="inputEmail4">Phone_no</label>
                                    <input
                                        type="text"
                                        className="form-control Phone_no1"
                                        name="phone_no"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row account-create">
                                <div class="form-group">
                                    {errors.message ? (
                                        <p className="error">
                                            {errors.message}
                                        </p>
                                    ) : null}

                                    <button
                                        type="submit"
                                        onClick={this.handleClick}
                                        class="btn btn-warning"
                                    >
                                        Create Account
                                    </button>
                                    {errors.data ? (
                                        <p className="error">
                                            "Invalid Details"
                                        </p>
                                    ) : null}
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

export default connect(mapstateToProps, { RegisterUsers })(
    withRouter(NextSignUpPage)
);
