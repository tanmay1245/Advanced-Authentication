import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import PrivateScreen from "./components/PrivateScreen";
import ResetPassword from "./components/ResetPassword";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><PrivateScreen></PrivateScreen></PrivateRoute>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
            <Route path="/passwordreset/:resetToken" element={<ResetPassword></ResetPassword>}></Route>
        </Routes>
    );
}

export default App;