import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    // Por ejemplo, eliminar el token de autenticación, limpiar el estado, etc.
    // Luego redirigir al usuario a la página de inicio de sesión.
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome!</h1>
      <p style={styles.text}>You have successfully logged in.</p>
      <button style={styles.button} onClick={handleLogout}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: '3rem',
    color: '#333',
  },
  text: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#555',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default WelcomePage;
