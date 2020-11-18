import React, { Component } from 'react'


import './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Global from './Global';
import India from './India';


class App extends Component {

    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Global} />
                    <Route path='/india' component={India} />
                </Switch>
            </Router>
            
        )
    }
}

export default App;