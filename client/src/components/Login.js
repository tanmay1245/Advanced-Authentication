import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import validateCredentials from "../utils/validateCredentials";

const Register = () => {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [error, setError] = useState("");

    const loginHandler = (e) => {
        e.preventDefault();
        if (validateData()) {
            axios.post("/auth/login", {
                email: email.current.value,
                password: password.current.value
            }).then((response) => {
                if (response && response.data) {
                    if (response.data.success) {
                        localStorage.setItem("authToken", response.data.token);
                        localStorage.setItem("username", response.data.username);
                        navigate("/");
                    }
                }
            }).catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data.error)
                }
            });
        }
    };

    const validateData = () => {
        const [emailValid] = validateCredentials(email.current.value, password.current.value);
        setIsEmailValid(emailValid);

        if (emailValid) {
            return true;
        }
        return false;
    };

    return (
        <div className="bg-[#131314]">
            <div className="h-screen overflow-auto w-full flex justify-center">
                <div className="flex flex-col w-[320px] mt-[140px] font-poppins">
                    <div className="mb-4">
                        <div className="flex justify-center items-center flex-col">
                            <span className="text-white font-bold text-xl tracking-wide mb-1">Login</span>
                            <span className="text-[#8c8c8c] font-normal text-sm">Good to see you again</span>
                        </div>
                    </div>
                    <div>

                        {/* Email */}
                        <div className="mb-4">
                            <div className="relative ">
                                <input type="text" ref={email}
                                    className="peer/username bg-[#131314] focus:outline-0 h-14 w-full text-white text-sm
                                    border-b border-[#8c8c8c] focus:border-[white] valid:border-[white] focus:border-b valid:border-b rounded-none"
                                    required>
                                </input>
                                <label className="absolute left-0 top-[50%] -translate-y-1/2 text-[#8c8c8c] text-base pointer-events-none duration-300
                                        peer-focus/username:text-xs peer-focus/username:top-[15%] peer-valid/username:text-xs peer-valid/username:top-[15%]">
                                    Email
                                </label>
                                {
                                    !isEmailValid &&
                                    (
                                        <div className="absolute -bottom-[35%] right-0 z-10 flex">
                                            <img className="w-4 mr-1" src="/error.png" alt="error"></img>
                                            <span className="text-[#730202] text-xs font-medium">Wrong or Invalid email address</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <div className="relative ">
                                <input type={showPassword ? "text" : "password"} ref={password}
                                    className="peer/username bg-[#131314] focus:outline-0 h-14 w-full text-white text-sm
                                    border-b border-[#8c8c8c] focus:border-[white] valid:border-[white] focus:border-b valid:border-b rounded-none"
                                    required>
                                </input>
                                <span className="absolute top-[30%] right-0 w-5">
                                    <button onClick={() => { setShowPassword(!showPassword) }}
                                        title={showPassword ? "Hide Password" : "Show Password"}>
                                        {
                                            showPassword ? <img src="/hide-password.png" alt="hide-password"></img> : <img src="/show-password.png" alt="show-password"></img>
                                        }
                                    </button>
                                </span>
                                <label className="absolute left-0 top-[50%] -translate-y-1/2 text-[#8c8c8c] text-base pointer-events-none duration-300
                                        peer-focus/username:text-xs peer-focus/username:top-[15%] peer-valid/username:text-xs peer-valid/username:top-[15%]">
                                    Password
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgotpassword" className="text-[#5873A3] hover:text-[#495f86] text-sm font-medium">Forgot password?</Link>
                        </div>

                        {
                            error && (
                                <div className="bg-[#730202] text-[#fff] text-sm py-3 px-4 mt-3">
                                    <span >{error}</span>
                                </div>
                            )
                        }


                        <div className="flex justify-center mb-4 mt-4">
                            <button onClick={loginHandler} className="text-[#fff] bg-[#1e1f20] px-5 py-2 rounded
                                text-lg font-semibold shadow-sm hover:bg-[#333537] duration-[0.2s] w-full">
                                Log In
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <span className="text-white">Dont have an account ?
                                <Link to="/register" className="ms-1 font-medium text-[#5873A3] hover:text-[#495f86]">Register</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
