import React, { useState } from "react";
import Input from "../input/Input";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import Footer from "../footer/Footer.tsx";
import Button from "../button/Button";
import { logIn } from "../../fetch/fetchService.ts";

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await logIn(email, password);
        if (response.statusCode === 200) {
            localStorage.setItem("token", response.token);
            navigate("/user");
        }
        setIsLoading(false);
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column justify-content-center rounded bg-white px-5 py-3">
                <h1 className="text-primary text-center">LogIn</h1>
                <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        setValue={setEmail}
                        value={email}
                        placeholder="Email"
                        error="Email is empty"
                        type="text"
                        rules="^.+$"
                    />

                    <Input
                        label="Password"
                        setValue={setPassword}
                        value={password}
                        placeholder="Password"
                        error="Password is empty"
                        type="password"
                        rules="^.+$"
                    />

                    <Button
                        type="submit"
                        style="btn btn-primary mt-3"
                        isDisabled={!email || !password || isLoading}
                        isLoading={isLoading}
                        text="LogIn"
                    />

                    <Footer content="Don't have an account?" link="/signup" linkText="SignUp" />
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default LogIn;