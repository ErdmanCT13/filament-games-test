import { useContext, useEffect } from "react"
import { Auth } from "@aws-amplify/auth"
import UserContext from "../../userContext.js"
import "./userInfo.css"



export default function UserInfo() {

    var { user } = useContext(UserContext)

    return (
        <div className="userInfo">
            {
                (user)
                    ? <div className="userInfo__login-message">
                        <div className="userInfo__login-welcome">Welcome to Filament Games</div>
                        <div className="userInfo__login-email">{user.attributes.email}</div>

                    </div>
                    : <div className="userInfo__spinner"></div>
            }
        </div>

    )

}