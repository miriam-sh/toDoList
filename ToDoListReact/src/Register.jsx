import { Button, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router";
import service from "./service";

export const Register = () => {

    const nav = useNavigate()

    return <>
        <form onSubmit={async (e) => {

            e.preventDefault();

            let user = {
                username: e.target[0].value,
                password: e.target[2].value
            }

            await service.register(user)

            nav("../manageToDoList")

        }}>
            <TextField label="user name"></TextField>
            <TextField type="password" label="password" variant="outlined"></TextField>
            <Button startIcon={<LoginIcon></LoginIcon>} type="submit" variant="outlined">הרשמה</Button>
        </form>
    </>
}