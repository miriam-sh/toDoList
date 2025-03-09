import { Button, TextField } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import service from "./service";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const Login = () => {

    const nav = useNavigate()

    return <>
        <form onSubmit={async (e) => {

            e.preventDefault();

            let user = {
                username: e.target[0].value,
                password: e.target[2].value
            }

            await service.login(user)

            nav("../manageToDoList")
        }}>
            <TextField label="user name"></TextField>
            <TextField type="password" label="password" variant="outlined"></TextField>
            <Button startIcon={<LoginIcon></LoginIcon>} type="submit" variant="outlined">כניסה</Button>
        </form>
    </>

}