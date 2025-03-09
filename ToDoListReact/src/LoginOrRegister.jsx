import { NavLink, Outlet } from "react-router-dom"



export const LoginOrRegister = () => {

    return <>
        <NavLink to={"login"}>כניסה</NavLink>
        <NavLink to={"register"}>הרשמה</NavLink>
        <Outlet></Outlet>
    </>
}