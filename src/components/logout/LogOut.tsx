import { useNavigate } from "react-router";

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>;
}

export default LogOut;