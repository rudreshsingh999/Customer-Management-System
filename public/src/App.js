import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './Components/NavBar';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users : [],
      name : "",
      email : "",
      password : "",
      id : 0
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/')
    .then((res)=>
      this.setState({
        users : res.data,
        name : "",
        email : "",
        password : "",
        id : 0
    }))
  }

  namechange = event => {
    this.setState({
      name : event.target.value
    })
  }

  emailchange = event => {
    this.setState({
      email : event.target.value
    })
  }

  passwordchange = event => {
    this.setState({
      password : event.target.value
    })
  }

  submit(event, id) {
    event.preventDefault();
    if(id === 0) {
      axios.post('http://localhost:5000', {"name" : this.state.name, "email" : this.state.email, "password" : this.state.password})
      .then(() => {
        this.componentDidMount();
      })
    }
    else {
      axios.put(`http://localhost:5000/${id}`, {"name" : this.state.name, "email" : this.state.email, "password" : this.state.password})
      .then(() => {
        this.componentDidMount();
      })
    }
  }

  delete(id) {
    axios.delete(`http://localhost:5000/${id}`)
    .then(() => {
      this.componentDidMount();
    })
  }

  getone(id) {
    axios.get(`http://localhost:5000/getone/${id}`)
    .then((res)=>{
      this.setState({
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
        id: res.data._ID
      })
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col lg-6 mt-5">
              <form onSubmit={(e)=>{this.submit(e, this.state.id)}}>
                <div className="form-group">
                  <input type="text" onChange={(e)=>{this.namechange(e)}} className="form-control" value={this.state.name} placeholder="Name" />
                </div>
                <div className="form-group">
                  <input type="text" onChange={(e)=>{this.emailchange(e)}} className="form-control" value={this.state.email} placeholder="Email" />
                </div>
                <div className="form-group">
                  <input type="text" onChange={(e)=>{this.passwordchange(e)}} className="form-control" value={this.state.password} placeholder="Password" />
                </div>
                <button className="btn btn-block btn-primary">Submit</button>
              </form>

            </div>
            <div className="col lg-6 mt-5">
              <table className="table">
                <thead>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </thead>

                <tbody>
                  {this.state.users.map(user=>
                    <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <button onClick={(e)=>{this.getone(user._ID)}} className="btn btn-sm btn-primary">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </td>
                    <td>
                      <button onClick={(e)=>{this.delete(user._ID)}} className="btn btn-sm btn-danger">
                      <i className="fa fa-trash"></i>
                      </button>
                    </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
