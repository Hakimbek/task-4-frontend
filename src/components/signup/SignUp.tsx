import React, { useState } from "react";
import Input from "../input/Input.tsx";
import { ToastContainer } from 'react-toastify';
import { signUp } from "../../fetch/fetchService.ts";
import Footer from "../footer/Footer.tsx";
import Button from "../button/Button.tsx";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await signUp(email, username, password);
        if (response.statusCode === 200) {
            setPassword('');
            setEmail('');
            setUsername('');
        }
        setIsLoading(false);
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column justify-content-center rounded bg-white px-5 py-3">
                <h1 className="text-primary text-center">Create account!</h1>
                <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        setValue={setUsername}
                        value={username}
                        placeholder="Username"
                        error="Username is empty"
                        type="text"
                        rules="^.+$"
                    />

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
                        isDisabled={!email || !username || !password || isLoading}
                        isLoading={isLoading}
                        text="Create"
                    />

                    <Footer content="Already have an account?" link="/login" linkText="LogIn" />
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default SignUp;