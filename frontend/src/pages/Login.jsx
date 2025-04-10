<<<<<<< HEAD
import { useState } from "react"
import { Input } from "../components/input/input"

export function Login({ setUser }) {
    const [nombre, setNombre] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (nombre === "" || contraseña === "") {
            setError(true)
            return
        }

        setError(false)

        setUser([nombre])

    }
    
    
   
    return (

        <section className="bg-blue-200/50 drop-filter backdrop-blur-lg w-1/4 p-4 rounded-lg shadow-lg">

            <h1 className="font-bold text-2xl">Inicio de sesión</h1>

            <form className="flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <Input label="Nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                <Input label="Contraseña" type="text" value={contraseña} onChange={e => setNombre(e.target.value)} />
                <button className="hover:scale-105 bg-blue-400 text-white py-2 rounded">Login</button>
            </form>
            {error && <p>Todo los campos son obligatorios</p>}
        </section >
    )
}

=======
import { useState } from "react";
import { Input } from "../components/input/input";
import { Button } from "../components/botton/botton";

export function Login({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre === "" || contraseña === "") {
      setError(true);
      return;
    }

    setError(false);
    setUser([nombre]);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white-smoke">
      <section className="bg-marian-blue/30 flex flex-col gap-10 backdrop-filter backdrop-blur-lg min-w-96 p-10 rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl">Inicio de sesión</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            label="Contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <Button>Login</Button>
        </form>
        {error && <p>Todo los campos son obligatorios</p>}
      </section>
    </main>
  );
}
>>>>>>> main
