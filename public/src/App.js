import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import FormElement from './components/FormElement';
import TableElement from './components/TableElement'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users : [],
      name : "",
      email : "",
      password : "",
      id : 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.delete = this.delete.bind(this);
    this.getone = this.getone.bind(this);
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

  handleChange(event) {
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({
      [name] : value
    })
  }

  submit(event, id) {
    event.preventDefault();
    console.log(event);
    
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
    console.log(id);
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
              <FormElement
                name={this.state.name}
                email={this.state.email}
                password={this.state.password}
                id={this.state.id}
                handleChange={this.handleChange}
                submit={this.submit}
              />

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
                    <TableElement
                      user={user}
                      delete={this.delete}
                      getone={this.getone} 
                    />
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
