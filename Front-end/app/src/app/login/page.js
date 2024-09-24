// src/app/login/page.js
import styles from '../../styles/Login.module.css';
import FormRegister from '@/components/template/formRegister/FormTemplate';
export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img
          src="/logo-anacafe.jpg"
          alt="Anacafé Guatemala"
          className={styles.logo}
        />
        <h1 className={styles.title}>Inicio de Sesión</h1> {/* Aquí cambias el h1 */}
        <FormRegister />
      </div>
    </div>
  );
}
