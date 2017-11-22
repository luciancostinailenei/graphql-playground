import React, { Component } from 'react'
import { 
  Switch,
  Route
}                           from 'react-router-dom'

import LinkListPage         from '../LinkListPage/LinkListPage'
import CreateLink           from '../CreateLink/CreateLink'  
import Header               from '../Header/Header'
import Login                from '../Login/Login'

import                           './App.css';

class App extends Component {

  render() {
    return (
      <div className='App center w85'>
        <Header />
        <div className='App__main-content background-gray'>
          <Switch>
            <Route 
              exact 
              path='/' 
              component={ LinkListPage }
            />
            <Route 
              exact 
              path='/create' 
              component={ CreateLink }
            />
            <Route
              exact
              path='/login'
              component={ Login }
            />
          </Switch>  
        </div>
      </div>
    )
  }
  
}

export default App
