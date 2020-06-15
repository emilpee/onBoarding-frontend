import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './scss/index.scss'
import { Login, Dashboard } from './views'

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
    </Router>,
    document.querySelector('#root'),
)
