import { Button, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router";
import service from "./service";

export const Register = () => {

    const nav = useNavigate()

    const register = async (e) => {
        e.preventDefault();

        let user = {
            username: e.target[0].value,
            password: e.target[2].value
        }

        await service.register(user)

        nav("../manageToDoList")
    }

    return <>
        <div className="register">
            <form className="form" onSubmit={async (e) => { register(e) }}>
                <TextField required className="inputTextField" label="user name"></TextField>
                <TextField required className="inputTextField" type="password" label="password" variant="outlined"></TextField>
                <Button id="submitInput" className="inputTextField" startIcon={<LoginIcon></LoginIcon>} type="submit" variant="outlined">הרשמה</Button>
            </form>
        </div>
    </>
}
