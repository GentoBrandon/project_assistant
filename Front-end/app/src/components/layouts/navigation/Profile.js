import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';
import styles from '../../../styles/Layouts.module.css';
import axios from "axios";
import { useRouter } from 'next/navigation'; // Asegúrate de usar useRouter para el cliente
import { useState } from "react";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import { toast } from "nextjs-toast-notify";

function ProfileDropdown() {

  const router = useRouter();
  const [profileData, setProfileData] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, {
        withCredentials: true,
      });
      setProfileData(null);
      router.push("/");
      toast.info("Sesión cerrada", {
        duration: 1500,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        sonido: true,
      });

    } catch (error) {
      toast.error("¡Error, intente de nuevo!", {
        duration: 2000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        sonido: true,
      });
    }
  };
    return (
      <NavDropdown
      title={
        <Image
        src="/user_profile.svg" // Reemplaza con la ruta a tu imagen
        alt="Profile Picture"
        width={40}
        height={40}
        className="rounded-circle"
        />
      }
      id="navbarScrollingDropdown"
      className={styles.caret}
      align="end" // Alinea el dropdown hacia la derecha
      >
      <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
      </NavDropdown>
    );
  }
export default ProfileDropdown;