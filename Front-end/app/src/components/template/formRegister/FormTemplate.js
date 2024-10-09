
import styles from '../../../styles/Login.module.css'
import { Form}  from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';

export default function FormRegister(){
    const [credentials, setCredentials] = useState({
      user_name: '',
      password: ''
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitar comportamiento predeterminado del formulario
        const form = event.currentTarget;
        // Validación del formulario
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/signin', credentials,{ withCredentials: true });
                console.log('Respuesta del servidor:', response.data);
            } catch (error) {
                console.error('Error al enviar los datos:', error
                );}
        }

        setValidated(true);
    };
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} name="username">Usuario</label>
                  <input 
                  required
                  type="text" 
                  className={styles.input} 
                  placeholder="Ingrese su usuario" 
                  name="user_name"
                  id="user_name"
                  onChange={handleChange}/>
                  <Form.Control.Feedback type="invalid">Datos incorrectos.</Form.Control.Feedback>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Contraseña</label>
                  <input 
                  required
                  type="password" 
                  className={styles.input} 
                  placeholder="Ingrese su contraseña"
                  name="password" 
                  id="password"
                  onChange={handleChange}/>
                  <Form.Control.Feedback type="invalid">Datos incorrectos.</Form.Control.Feedback>
                </div>

                <a href="#" className={styles.forgotPassword}>
                    ¿Olvidó su contraseña?
                </a>
                <button type="submit" className={styles.loginButton}>
                    Iniciar Sesión
                </button>
        </Form>
    )
}