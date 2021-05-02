import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import { useState, useEffect } from "react"
import UserContext from "./userContext.js"
import Login from "./components/login/login.jsx"
import UserInfo from "./components/userInfo/userInfo.jsx"
import Amplify, { Auth } from "@aws-amplify/auth"
import config from "./aws-exports.js"

Amplify.configure(config)

Auth.configure({storage: window.sessionStorage})

function App() {
  var [user, setUser] = useState(null) // try grabbing from local storage right away. user should be set already after a refresh if already logged in

  useEffect(() => { // WE DO THIS FOR SOCIAL SIGN INS. after signin redirect, the current user is stored in Auth
    (async () => {
      try{
        var cognitoUser = await Auth.currentAuthenticatedUser()
      }
      catch(error){
        console.warn("no user authenticated at first render of app")
      }
      setUser(cognitoUser)
    })()
  }, []) 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="app">
        <Router>
          {(() => {
            console.log(user)
          })()}
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route exact path="/user">
              <UserInfo></UserInfo>
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>

  );
}

export default App;
