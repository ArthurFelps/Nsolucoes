import { Routes, Route} from "react-router-dom";
import Login from "../views/login";
import Dashboard from "../views/dashboard";

function MainRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}
export default MainRoutes;