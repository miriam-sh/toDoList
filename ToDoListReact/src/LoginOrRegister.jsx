import { NavLink, Outlet } from "react-router-dom"
import "./style.css"


export const LoginOrRegister = () => {

    return <>
        <div className="lor">
            <div className="loginOrRegisterLinks">
                <NavLink to={"login"} className={"niceLink"}>כניסה</NavLink>
                <NavLink to={"register"} className={"niceLink"}>הרשמה</NavLink>
            </div>
            <Outlet></Outlet>
        </div>
    </>
}
