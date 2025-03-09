import { Route, Routes } from "react-router"
import { Login } from "./Login"
import { Register } from "./Register"
import { ManageToDoList } from "./ManageToDoList"
import { LoginOrRegister } from "./LoginOrRegister"



export const Routing = () => {

    return (<Routes>
        <Route path={""} element={<LoginOrRegister></LoginOrRegister>}>
            <Route path={""} element={<Login></Login>}></Route>
            <Route path={"Login"} element={<Login></Login>}></Route>
            <Route path={"Register"} element={<Register></Register>}></Route>
        </Route>
        <Route path={"loginOrRegister"} element={<LoginOrRegister></LoginOrRegister>}>
            <Route path={""} element={<Login></Login>}></Route>
            <Route path={"Login"} element={<Login></Login>}></Route>
            <Route path={"Register"} element={<Register></Register>}></Route>
        </Route>
        <Route path={"ManageToDoList"} element={<ManageToDoList></ManageToDoList>}></Route>
    </Routes>
    )
}