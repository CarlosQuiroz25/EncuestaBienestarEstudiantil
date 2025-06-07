
const  VITE_API_URl  = import.meta.env.VITE_API_URl

export function fetchRegister({ email, password, password_confirmation }) {
  return fetch(`${VITE_API_URl}/api/admin/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, password_confirmation, role: 'STUDENT' }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}