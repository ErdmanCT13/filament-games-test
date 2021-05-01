import { useEffect, useContext, useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { Auth } from "@aws-amplify/auth"

import UserContext from "../../userContext.js"
import "./login.css"




var myStorage = window.localStorage;


export default function Login() {

    var history = useHistory()

    var { user, setUser } = useContext(UserContext)

    var usernameField = useRef(null)
    var passwordField = useRef(null)
    var [authInProgress, setAuthState] = useState(false) // keep track of authorization status, are we still waiting or not?
    var [loginError, isLoginErrorVisible] = useState(false)

    var googleAuth = async () => {
        try {
            isLoginErrorVisible(false) // hide any error messages before each new attempt
            await Auth.federatedSignIn({ provider: "Google" })
            //console.log(user, "HERES THE USERajsdf;jaksd;jkfasljdfljasdj;kfasjlkdfj;lkasj;lkdf;jlkas!")
            setAuthState(false) // auth is no longer in progress
        }
        catch (error) {
            isLoginErrorVisible(true)
            console.warn(new Error("incorrect username or password"))
        }
    }
    var normalAuth = async (username, password) => {
        try {
            isLoginErrorVisible(false) // hide any error messages before each new attempt
            await Auth.signIn(username, password)
            var cognitoUser = await Auth.currentAuthenticatedUser()

            if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
                await Auth.completeNewPassword(cognitoUser, "password") // give the user a new password. this would NOT be included in any kind of production code, its only here as a work around
            } // work around. users created in the console are only given temporary passwords, and as such have no authorization
            setUser(cognitoUser)
            history.push("/user")

        }
        catch (error) {
            isLoginErrorVisible(true)
            console.warn(new Error("incorrect username or password"))
        }
    }

    return (
        <div className="login">
            <div className="login__filament-logo"></div>
            <div className="login__username-field">
                <input ref={usernameField} placeholder="Username"></input>
            </div>
            <div className="login__password-field">
                <input ref={passwordField} type="password" placeholder="Password"></input>
            </div>
            <div className="login__submit" onClick={() => {
                normalAuth(usernameField.current.value, passwordField.current.value)
                isLoginErrorVisible(false)
                setAuthState(true)
            }}>
                <div>Log in</div>
                <div></div>
            </div>
            <div className="login__google" onClick={() => {
                googleAuth()
                isLoginErrorVisible(false)
                setAuthState(true)
            }}>
                <div>Log in with Google</div>
                <div></div>
            </div>
            {(() => {
                if (loginError) {
                    return (
                        <div className="login__error">
                            Incorrect username or password
                        </div>
                    )
                }
            })()}

        </div>

    )
}

export function LoginError() {

}