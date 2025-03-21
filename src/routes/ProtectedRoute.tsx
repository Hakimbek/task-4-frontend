import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import { validateToken } from "../fetch/fetchService.ts";
import Spinner from "../components/spinner/Spinner.tsx";

const ProtectedRoute = () => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setIsValid(false);
            return;
        }

        validateToken()
            .then(response => {
                if (response && response.statusCode === 200) setIsValid(true);
            })
            .catch(() => setIsValid(false));
    }, [token]);

    if (isValid === null) return <Spinner />;
    return isValid ? <Outlet/> : <Navigate to="/login"/>;
};

export default ProtectedRoute;