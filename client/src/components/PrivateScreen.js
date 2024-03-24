import React from 'react'
import { useNavigate } from "react-router-dom";

const PrivateScreen = () => {
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div className="h-screen overflow-hidden relative w-full bg-black font-heebo">
            <img src="/bg.jpg" alt="bg" className="object-cover h-screen w-full overflow-hidden opacity-70"></img>

            <div className="absolute top-0 text-white mt-[10%] pl-[10%]">
                <div className="flex flex-col">
                    <span>Hi <span className="font-semibold">{username}</span></span>
                    <span className="font-heebo font-bold text-7xl">WELCOME</span>
                    <span>You possess authorization to view confidential material.</span>
                </div>
                <div className="mt-8">
                    <button onClick={logoutHandler} className="border-2 border-white px-4 py-1 font-bold hover:bg-white hover:text-[#7B503F]
                        duration-[0.2s]">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PrivateScreen;