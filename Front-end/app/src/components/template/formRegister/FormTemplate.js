import InputDataII from '@/components/layouts/InputData/InputDataII';
import styles from '../../../styles/Login.module.css'
import { Form } from "react-bootstrap";
import { useState } from 'react';

export default function FormRegister(){
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <InputDataII id="name" 
                type="text" 
                placeholder="Ingrese su usuario" 
                name="Usuario" 
                Feedback="Ingrese su nombre."/>

                <InputDataII id="passw" 
                type="password" 
                placeholder="Ingrese su contraseña" 
                name="Contraseña" 
                Feedback="Ingrese su contraseña."/>

                <a href="#" className={styles.forgotPassword}>
                    ¿Olvidó su contraseña?
                </a>
                <button type="submit" className={styles.loginButton}>
                    Iniciar Sesión
                </button>
        </Form>
    )
}