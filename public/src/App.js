import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login'
import SignUp from './SignUp'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;