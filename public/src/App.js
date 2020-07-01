import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login'
import SignUp from './SignUp'
import Payment from './Payment'
import Homepage from './Homepage'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                <Route exact path='/dashboard' component={Homepage} />
                    <Route exact path='/' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/customerPanel' component={Dashboard} />
                    <Route exact path='/payment' component={Payment} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;