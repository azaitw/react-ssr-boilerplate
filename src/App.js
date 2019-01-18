import React from 'react'
import Container from './components/Container'
import { Route, Switch } from 'react-router-dom'

const App = ({ pageObj, result }) => {
  return <Switch>
    <Route
      path='/'
      render={props =>
        <Container
          {...props}
          result={result}
          pageObj={pageObj}
        />
      }
    />
  </Switch>
}

export default App
