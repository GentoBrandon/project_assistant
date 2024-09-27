import InputDataLayout from "@/components/layouts/InputData/InputDataLayout"
import styles from '../../../styles/Login.module.css'
export default function FormRegister(){
    return (
        <form>
                <div className={styles.inputGroup}>
                    <InputDataLayout id="userName" type="text" placeholder="Ingrese su nombre" label="Usuario" />
                </div>
                <div className={styles.inputGroup}>
                    <InputDataLayout id="passw" type="password" placeholder="Ingrese su contraseña" label="Contraseña"/>
                </div>
                <a href="#" className={styles.forgotPassword}>
                    ¿Olvidó su contraseña?
                </a>
                <button type="submit" className={styles.loginButton}>
                    Iniciar Sesión
                </button>
        </form>
    )
}