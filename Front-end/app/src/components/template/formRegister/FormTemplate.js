import styles from '../../../styles/Login.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

export default function FormRegister() {
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        user_name: '',
        password: ''
    });

    const [errors, setErrors] = useState({}); // Estado para almacenar errores personalizados

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setErrors({ ...errors, [e.target.name]: '' }); // Limpiar errores al escribir
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let validationErrors = {};

        // Validación personalizada
        if (!credentials.user_name) {
            validationErrors.user_name = 'El nombre de usuario es obligatorio.';
        }
        if (!credentials.password) {
            validationErrors.password = 'La contraseña es obligatoria.';
        }

        // Si hay errores, establecerlos en el estado y detener el envío
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Si no hay errores, proceder con la lógica de envío
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', credentials, { withCredentials: true });
            toast.success("¡Inicio de sesión exitoso!", {
                duration: 1500,
                progress: true,
                position: "top-center",
                transition: "bounceIn",
                sonido: true,
            });
            router.push('/dashboard'); // Redirigir a la página principal
        } catch (error) {
            toast.error("¡Error, datos incorrectos!", {
                duration: 2000,
                progress: true,
                position: "top-center",
                transition: "bounceIn",
                sonido: true,
            });
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="user_name">Usuario</label>
                <input
                    required
                    type="text"
                    className={styles.input}
                    placeholder="Ingrese su usuario"
                    name="user_name"
                    id="user_name"
                    onChange={handleChange}
                />
                {/* Mostrar mensaje de error si existe */}
                {errors.user_name && <div className={styles.error}>{errors.user_name}</div>}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="password">Contraseña</label>
                <input
                    required
                    type="password"
                    className={styles.input}
                    placeholder="Ingrese su contraseña"
                    name="password"
                    id="password"
                    onChange={handleChange}
                />
                {/* Mostrar mensaje de error si existe */}
                {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>

            <a href="#" className={styles.forgotPassword}>
                ¿Olvidó su contraseña?
            </a>
            <button type="submit" className={styles.loginButton}>
                Iniciar Sesión
            </button>
        </form>
    );
}
