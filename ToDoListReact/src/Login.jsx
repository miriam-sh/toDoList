import { Button, TextField } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import service from "./service";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const Login = () => {

    const nav = useNavigate()

    useEffect(() => {        
        if (window.location.href[window.location.href.length - 1] != 'n')
            nav("./login")
    })

    const login = async (e) => {
        e.preventDefault();

        let user = {
            username: e.target[0].value,
            password: e.target[2].value
        }

        await service.login(user)

        nav("../manageToDoList")
    }

    return <>
        <div className="login">
            <form className="form" onSubmit={async (e) => { login(e) }}>
                <TextField required className="inputTextField" label="user name"></TextField>
                <TextField required className="inputTextField" type="password" label="password" variant="outlined"></TextField>
                <Button id="submitInput" className="inputTextField" startIcon={<LoginIcon></LoginIcon>} type="submit" variant="outlined">כניסה</Button>
            </form>
        </div>
    </>

}
