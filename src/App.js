import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import RegisterForm from './components/RegisterForm'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={RegisterForm} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/home" component={Home} />

    <Route component={NotFound} />
  </Switch>
)

export default App
