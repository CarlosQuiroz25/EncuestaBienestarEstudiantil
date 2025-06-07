
const VITE_API_URl  = import.meta.env.VITE_API_URl;

export const fetchLogin = async ({ email, password }) => {
    const response = await fetch(`${VITE_API_URl}/api/auth/login`, {
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