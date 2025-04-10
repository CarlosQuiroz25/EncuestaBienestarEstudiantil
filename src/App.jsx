import { Route, Router, Routes } from "react-router-dom";
import  {Login} from "./pages/Login";
import  {Home} from "./pages/home";
import { useState } from 'react'

function App() {
    const [user, setUser] = useState([])
    return (
        <Routes>
            <Route path="/" element={<Login setuser={setUser} />} />
            <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        </Routes>
    )
}
export default App;