import React, { Component } from 'react';
import NavBar from './components/NavBar'
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      username : '',
      password : '',
      loggedin : false,
      placeholder : '',
      select: ''
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
    if(this.state.select === 'admin') {
      axios.post('http://localhost:5000/signin_admin', {"username" : this.state.username, "password" : this.state.password})
        .then((msg) => {
          console.log(msg.data.message);
          if(msg.data.message === 'success') {
            this.props.history.push('/dashboard');
            this.setState({loggedin : true});
          }
          else {
            this.setState({placeholder : msg.data.message});
          }
      })
    }
    else {
      axios.post('http://localhost:5000/signin_customer', {"username" : this.state.username, "password" : this.state.password})
        .then((msg) => {
          console.log(msg.data.message);
          if(msg.data.message === 'success') {
            this.props.history.push('/customerPanel');
            this.setState({loggedin : true});
          }
          else {
            this.setState({placeholder : msg.data.message});
          }
      })
    }
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
              <h3 style={{textAlign: "center"}}>Login</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <select value={this.state.select} onChange={this.handleChange} name="select" className="form-control" required>
                    <option value="">Select an option</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" onChange={this.handleChange} name="username" className="form-control"  value={this.state.username} placeholder="Username" />
                </div>
                <div className="form-group">
                  <input type="password" onChange={this.handleChange} name="password" className="form-control" value={this.state.password} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Submit</button>
                <p className="forgot-password text-right mt-1">
                  Not Registered? <a href="/signup">SignUp</a>
                </p>
              </form>
              <div className="col text-center text-danger">
                {!this.state.loggedin && this.state.placeholder}
              </div>
            </div>
            <div className="col mt-5">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
