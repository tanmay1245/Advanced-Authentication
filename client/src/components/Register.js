import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import validateCredentials from "../utils/validateCredentials";

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [error, setError] = useState("");

    const registerHandler = (e) => {
        e.preventDefault();
        if (validateData()) {
            axios.post("/auth/register", {
                email: email.current.value,
                username: username.current.value,
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
                    if (error.response.data.code === 11000) {
                        setError("Username or Email already exists.")
                    } else {
                        setError("Some error occured.")
                    }
                }
            });
        }
    };

    const validateData = () => {
        username.current.value ? setIsUsernameValid(true) : setIsUsernameValid(false);
        const [emailValid, passwordValid] = validateCredentials(email.current.value, password.current.value);
        setIsEmailValid(emailValid);
        setIsPasswordValid(passwordValid);
        var confirmPasswordValid = password.current.value === confirmPassword.current.value && password.current.value;
        setIsConfirmPasswordValid(confirmPasswordValid);

        if (username.current.value && emailValid && passwordValid && confirmPasswordValid) {
            return true;
        }
        return false;
    };

    return (
        <div className="bg-[#131314]">
            <div className="h-screen overflow-auto w-full flex justify-center">
                <div className="flex flex-col w-[320px] mt-[120px] font-poppins">
                    <div className="mb-4">
                        <div className="flex justify-center items-center flex-col">
                            <span className="text-white font-bold text-xl tracking-wide mb-1">Register</span>
                            <span className="text-[#8c8c8c] font-normal text-sm">Create your account</span>
                        </div>
                    </div>
                    <div>
                        {/* User name */}
                        <div className="mb-4">
                            <div className="relative ">
                                <input type="text" ref={username}
                                    className="peer/username bg-[#131314] focus:outline-0 h-14 w-full text-white text-sm
                                    border-b border-[#8c8c8c] focus:border-[white] valid:border-[white] focus:border-b valid:border-b rounded-none"
                                    required>
                                </input>
                                <label className="absolute left-0 top-[50%] -translate-y-1/2 text-[#8c8c8c] text-base pointer-events-none duration-300
                                        peer-focus/username:text-xs peer-focus/username:top-[15%] peer-valid/username:text-xs peer-valid/username:top-[15%]">
                                    Username
                                </label>
                                {
                                    !isUsernameValid &&
                                    (
                                        <div className="absolute -bottom-[35%] right-0 z-10 flex">
                                            <img className="w-4 mr-1" src="/error.png" alt="error"></img>
                                            <span className="text-[#730202] text-xs font-medium">Please provide username</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

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
                        <div className="mb-4">
                            <div className="relative ">
                                <input type={showPassword1 ? "text" : "password"} ref={password}
                                    className="peer/username bg-[#131314] focus:outline-0 h-14 w-full text-white text-sm
                                    border-b border-[#8c8c8c] focus:border-[white] valid:border-[white] focus:border-b valid:border-b rounded-none"
                                    required>
                                </input>
                                <span className="absolute top-[30%] right-0 w-5">
                                    <button onClick={() => { setShowPassword1(!showPassword1) }}
                                        title={showPassword1 ? "Hide Password" : "Show Password"}>
                                        {
                                            showPassword1 ? <img src="/hide-password.png" alt="hide-password"></img> : <img src="/show-password.png" alt="show-password"></img>
                                        }
                                    </button>
                                </span>
                                <label className="absolute left-0 top-[50%] -translate-y-1/2 text-[#8c8c8c] text-base pointer-events-none duration-300
                                        peer-focus/username:text-xs peer-focus/username:top-[15%] peer-valid/username:text-xs peer-valid/username:top-[15%]">
                                    Password
                                </label>
                                {
                                    !isPasswordValid &&
                                    (
                                        <div className="absolute -bottom-[35%] right-0 z-10 flex">
                                            <img className="w-4 mr-1" src="/error.png" alt="error"></img>
                                            <span className="text-[#730202] text-xs font-medium">Password does not satisfy password policies</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-8">
                            <div className="relative ">
                                <input type={showPassword2 ? "text" : "password"} ref={confirmPassword}
                                    className="peer/username bg-[#131314] focus:outline-0 h-14 w-full text-white text-sm
                                    border-b border-[#8c8c8c] focus:border-[white] valid:border-[white] focus:border-b valid:border-b rounded-none"
                                    required>
                                </input>
                                <span className="absolute top-[30%] right-0 w-5">
                                    <button onClick={() => { setShowPassword2(!showPassword2) }}
                                        title={showPassword2 ? "Hide Password" : "Show Password"}>
                                        {
                                            showPassword2 ? <img src="/hide-password.png" alt="hide-password"></img> : <img src="/show-password.png" alt="show-password"></img>
                                        }
                                    </button>
                                </span>
                                <label className="absolute left-0 top-[50%] -translate-y-1/2 text-[#8c8c8c] text-base pointer-events-none duration-300
                                        peer-focus/username:text-xs peer-focus/username:top-[15%] peer-valid/username:text-xs peer-valid/username:top-[15%]">
                                    Confirm Password
                                </label>
                                {
                                    !isConfirmPasswordValid &&
                                    (
                                        <div className="absolute -bottom-[35%] right-0 z-10 flex">
                                            <img className="w-4 mr-1" src="/error.png" alt="error"></img>
                                            <span className="text-[#730202] text-xs font-medium">Passwords does not match</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {
                            error && (
                                <div className="bg-[#730202] text-[#fff] text-sm py-3 px-4">
                                    <span>{error}</span>
                                </div>
                            )
                        }


                        <div className="flex justify-center mb-4 mt-4">
                            <button onClick={registerHandler} className="text-[#fff] bg-[#1e1f20] px-5 py-2 rounded
                                text-lg font-semibold shadow-sm hover:bg-[#333537] duration-[0.2s] w-full">
                                Create an account
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <span className="text-white">Already have an account ?
                                <Link to="/login" className="ms-1 font-medium text-[#5873A3] hover:text-[#495f86]">Login</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
