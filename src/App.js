import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './containers/Home'

const App = () => (
  <BrowserRouter>
    <div className='container'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route render={() => <p>404: Page Not Found</p>} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App
