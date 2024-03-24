import React, { useRef, useState } from 'react'
import axios from "axios";
import validateCredentials from "../utils/validateCredentials";

const ForgotPassword = () => {
    const email = useRef();

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const sendEmailHandler = (e) => {
        e.preventDefault();
        if (validateData()) {
            axios.post("/auth/forgotpassword", {
                email: email.current.value
            }).then((response) => {
                if (response && response.data && response.data.success) {
                    setSuccess("An email has been sent. Please check you inbox.");
                }
            }).catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data.error)
                }
            });
        }
    }

    const validateData = () => {
        const [emailValid] = validateCredentials(email.current.value);
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
                            <span className="text-white font-bold text-xl tracking-wide mb-4">Forgot Password</span>
                            <span className="text-[#8c8c8c] font-normal text-sm text-center">
                                Please enter the email address you register your account with. We
                                will send you the link to get back to your account.
                            </span>
                        </div>
                    </div>
                    <div>
                        {/* Email */}
                        <div className="mb-8">
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

                        {
                            error && (
                                <div className="bg-[#730202] text-[#fff] text-sm py-3 px-4 mt-3">
                                    <span >{error}</span>
                                </div>
                            )
                        }

                        {
                            success && (
                                <div className="bg-[#025940] text-[#fff] text-sm py-3 px-4 mt-3">
                                    <span >{success}</span>
                                </div>
                            )
                        }


                        <div className="flex justify-center mb-4 mt-4">
                            <button onClick={sendEmailHandler} className="text-[#fff] bg-[#1e1f20] px-5 py-2 rounded
                                text-lg font-semibold shadow-sm hover:bg-[#333537] duration-[0.2s] w-full">
                                Send Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword