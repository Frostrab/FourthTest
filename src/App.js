import React, {useState} from 'react';
import Login from './page/Login/Login'
import Overview from './page/Overview/Overview'
import PrivateRoute  from './components/PrivateRoute'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import { AuthContext } from './context/auth';
import './App.css';
import LayoutItem from './components/Layoutitem';

function App ()  {
  const [authTokens, setAuthTokens] = useState()
  const setTokens = data => {
    setAuthTokens(data)
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
 
    <BrowserRouter>
    <Switch>
      <PrivateRoute compoenent={Overview} path="/Overview" />
     
      <Route component={Login} path="/" exact/>
    </Switch>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
