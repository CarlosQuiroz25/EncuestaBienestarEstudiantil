const API_URL = 'https://api.bienestar-estudiantil.edu';

export const getServicios = async () => {
  const response = await fetch(`${API_URL}/servicios`);
  if (!response.ok) {
    throw new Error('Error al obtener los servicios');
  }
  return await response.json();
};

export const agendarCita = async (citaData) => {
  const response = await fetch(`${API_URL}/agendar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(citaData),
  });
  if (!response.ok) {
    throw new Error('Error al agendar la cita');
  }
  return await response.json();
};