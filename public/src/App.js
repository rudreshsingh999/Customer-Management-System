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
      tmp_users : [],
      name : "",
      email : "",
      password : "",
      id : 0,
      sel : "Full List",
      search : ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.delete = this.delete.bind(this);
    this.getone = this.getone.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/')
    .then((res)=>
      this.setState({
        users : res.data,
        tmp_users : res.data,
        name : "",
        email : "",
        password : "",
        id : 0,
        sel : "Full List",
        search : ""
    }))
  }

  handleChange(event) {
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({
      [name] : value
    })
  }

  handleSearch(event) {
    event.preventDefault();
    console.log(this.state.sel);
    console.log(this.state.users);
    this.setState({
      users : this.state.tmp_users
    })
    var search_users = [];
    if(this.state.search === '' || this.state.sel === "") {
      search_users = this.state.tmp_users;
      this.setState({
        search : ''
      })
    }
    else {
      
      for(var i = 0; i < this.state.users.length; i++) {
        if(this.state.sel === 'name' && this.state.users[i].name === this.state.search) {
          search_users.push(this.state.users[i]);
        }
        if(this.state.sel === 'email' && this.state.users[i].email === this.state.search) {
          search_users.push(this.state.users[i]);
        }
        if(this.state.sel === 'password' && this.state.users[i].password === this.state.search) {
          search_users.push(this.state.users[i]);
        }
      }
    }
    this.setState({
      users : search_users
    })
    console.log(search_users);
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
            <div className="col-sm-4 lg-6 mt-5">
              <FormElement
                name={this.state.name}
                email={this.state.email}
                password={this.state.password}
                id={this.state.id}
                handleChange={this.handleChange}
                submit={this.submit}
              />

            </div>
            <div className="col-sm-8 lg-6 mt-5">

              <div className="row">
                <div className="col-sm-5">
                  <select value={this.state.sel} onChange={this.handleChange} name="sel" className="custom-select d-block w-50" required>
                    <option value="">Full List</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                  </select>
                </div>
                <div className="col-sm-7">
                  <form className="form-inline mt-2 mt-md-0">
                    <input className="form-control mr-sm-1" value={this.state.search} name="search" onChange={this.handleChange} type="text" placeholder="Search" aria-label="Search" />
                    <button onClick={this.handleSearch} className="btn btn-outline-primary">Search</button>
                  </form>
                </div>
              </div>

              <table className="table mt-2">
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
