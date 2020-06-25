import React, { Component } from 'react';
import NavBar from './components/NavBar'
import axios from 'axios'

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username : '',
            email : '',
            password : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/', {"username" : this.state.username, "email" : this.state.email, "password" : this.state.password})
        .then((msg) => {
            console.log(msg.data.message);
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container mt-5">
                    <div className="row mt-5">
                        <div className="col mt-5"> 
                        </div>
                        <div className="col mt-5">
                        <h3 style={{textAlign: "center"}}>SignUp</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <input type="text" onChange={this.handleChange} name="username" className="form-control"  value={this.state.username} placeholder="Username" />
                            </div>
                            <div className="form-group">
                            <input type="email" onChange={this.handleChange} name="email" className="form-control" value={this.state.email} placeholder="Email" />
                            </div>
                            <div className="form-group">
                            <input type="password" onChange={this.handleChange} name="password" className="form-control" value={this.state.password} placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-block btn-primary">Submit</button>
                            <p className="forgot-password text-right mt-1">
                                Already Registered? <a href="/">SignIn</a>
                            </p>
                        </form>
                        </div>
                        <div className="col mt-5">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;