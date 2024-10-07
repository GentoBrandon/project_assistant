'use client'; // Asegúrate de que esta directiva esté al inicio del archivo

import axios from "axios";
import { useRouter } from 'next/router'; // Asegúrate de usar useRouter para el cliente
import { useState } from "react";

function DashboardPage() {
  const [profileData, setProfileData] = useState(null);


  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true,
      });
      setProfileData(response.data);
    } catch (error) {
      console.error("Error al obtener el perfil", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, {
        withCredentials: true,
      });
      setProfileData(null);

    } catch (error) {
      console.error("Error al hacer logout", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={getProfile}>Get Profile</button>
      {profileData && (
        <div>
          <h2>Perfil:</h2>
          <p>Nombre de usuario: {profileData.user_name}</p>
          <p>Rol: {profileData.role}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>

    
    </div>
  );
}

export default DashboardPage;
