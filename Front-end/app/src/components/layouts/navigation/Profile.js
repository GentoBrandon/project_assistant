import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';
import styles from '../../../styles/Layouts.module.css';
function ProfileDropdown() {
    return (
      <NavDropdown
        title={
          <Image
            src="/user_profile.png" // Reemplaza con la ruta a tu imagen
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
        <NavDropdown.Item href="#action3">Configuración</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Perfil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#logout">Cerrar sesión</NavDropdown.Item>
      </NavDropdown>
    );
  }
export default ProfileDropdown;