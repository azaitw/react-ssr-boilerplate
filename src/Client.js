import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

// Load server-side render fetched data into app
ReactDOM.hydrate(
  <Router>
    <App result={window.INIT_DATA.result} pageObj={window.INIT_DATA.pageObj} />
  </Router>,
  document.getElementById('app')
)
