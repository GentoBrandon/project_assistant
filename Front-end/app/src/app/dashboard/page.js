'use client'; // Asegúrate de que esta directiva esté al inicio del archivo

import axios from "axios";
import { useRouter } from 'next/navigation'; // Asegúrate de usar useRouter para el cliente
import { useState } from "react";
import MainLayout from "@/components/template/principal/MainLayouts";

function DashboardPage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
/*

  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true,
      });
      setProfileData(response.data);
    } catch (error) {
      console.error("Error al obtener el perfil", error);
      router.push("/");
    }
  };
*/
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, {
        withCredentials: true,
      });
      setProfileData(null);
      router.push("/");

    } catch (error) {
      console.error("Error al hacer logout", error);
    }
  };

  return (
    <div>
      <MainLayout>
      <h1>Dashboard</h1>
      
      <button onClick={handleLogout}>Logout</button>
      </MainLayout>
    
    </div>
  );
}

export default DashboardPage;
