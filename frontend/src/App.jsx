import  {Login} from "./pages/Login";
import  {Home} from "./pages/home";
import { useState } from 'react'
import './App.css'

function App() {
    const [user, setUser] = useState([])
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-white-smoke ">
            {!user.length > 0
                ? <Login setuser={setUser} />
                : < Home user={user} setUser={setUser} />
            }
        </main>
    )
}
export default App;