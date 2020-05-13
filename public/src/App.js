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

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col lg-6 mt-5">
              <form onSubmit={(e)=>{this.submit(e)}}>
                <div className="form-group">
                  <input type="text" onChange={(e)=>{this.namechange(e)}} className="form-control" placeholder="Name" />
                </div>
                <div className="form-group">
                  <input type="text" onChange={(e)=>{this.emailchange(e)}} className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                  <input type="text" onChange={(e)=>{this.passwordchange(e)}} className="form-control" placeholder="Password" />
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
                      <button className="btn btn-sm btn-primary">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger">
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
