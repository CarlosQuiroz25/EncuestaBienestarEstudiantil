
const VITE_API_URl  = import.meta.env.VITE_API_URl;

export const fechLogin = async ({ email, password }) => {
    const response = await fetch(`https://proyecto-integrador-api.onrender.com/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
  
    return await response.json();
} 