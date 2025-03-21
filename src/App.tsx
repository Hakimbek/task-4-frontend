import { Routes, Route, Navigate } from "react-router";
import SignUp from "./components/signup/SignUp.tsx";
import LogIn from "./components/login/LogIn.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import User from "./components/user/User.tsx";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route index path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/user' element={<User />} />
      </Route>
    </Routes>
  )
}

export default App
