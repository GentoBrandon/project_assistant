import InputDataLayout from "@/components/layouts/InputData/InputDataLayout"
import styles from '../../../styles/Login.module.css'
export default function FormRegister(){
    return (
        <form>
                <div className={styles.inputGroup}>
                    <InputDataLayout id="userName" type="text" placeholder="Enter your UserName" label="Usuario" />
                </div>
                <div className={styles.inputGroup}>
                    <InputDataLayout id="userName" type="password" placeholder="Enter your UserName" label="Usuario"/>
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