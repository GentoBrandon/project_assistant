
import 'bootstrap/dist/css/bootstrap.min.css'; 
import InputDataII from '@/components/layouts/InputData/InputDataII';
import Buttons from '@/components/layouts/InputData/Buttons';
import styles from '../../../styles/FormStyles.module.css';
import { useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

function FormEmployed() {  
    const [Employed, setEmployed] = useState({
        name: '',
        last_name: '',
        dpi: '',
        number_IGGS: '',
        phone_number: '',
        number_NIT: '',
        direction: ''
    });

    const handleChange = (e) => {
        setEmployed({
            ...Employed,
            [e.target.name]: e.target.value
        });
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else{
            try {
                const response = axios.post('http://localhost:5000/api/employed/crear', Employed);
                toast.success("¡Empleado registrado!", {
                    duration: 1500,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            } catch (error) {
                toast.error("¡Error, intente de nuevo!", {
                    duration: 4000,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            }
        }
        setValidated(true);
    };
    return(
        <Form className={styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
            <InputDataII  
            type="text" 
            placeholder="Nombre" 
            name="Ingrese su nombre"
            Feedback="Ingrese su nombre."
            idInput="name"
            nameInput="name"
            handleChange={handleChange}
            as={Col}
            />

            <InputDataII id="lastName" 
            type="text" 
            placeholder="Apellido" 
            name="Ingrese su apellido"
            Feedback="Ingres su apellido"
            idInput="last_name"
            nameInput="last_name"
            handleChange={handleChange}
            as={Col}/>
            </Row>
            
            <InputDataII  
            type="text" 
            placeholder="DPI" 
            name="Ingrese su DPI"
            Feedback="Ingrese su DPI"
            idInput="dpi"
            nameInput="dpi"
            handleChange={handleChange}/>

            <InputDataII  
            type="text" 
            placeholder="IGSS" 
            name="Ingrese su IGSs"
            Feedback="Ingrese su IGSS"
            idInput="number_IGGS"
            nameInput="number_IGGS"
            handleChange={handleChange}/>


            <InputDataII
            type="text" 
            placeholder="Numero de telefono." 
            name="Ingrese su numero de Telefono" 
            Feedback="Ingrese su numero de Telefono"
            idInput="phone_number"
            nameInput="phone_number"
            handleChange={handleChange}/>

            <InputDataII  
            type="text" 
            placeholder="NIT" 
            name="Ingrese su numero de NIT"
            Feedback="Ingrese su numero NIT"
            idInput="number_NIT"
            nameInput="number_NIT"
            handleChange={handleChange}/>

            <InputDataII  
            type="text" 
            placeholder="Direccion" 
            name="Ingrese su Direccion"
            Feedback="Ingrese su NIT"
            idInput="direction"
            nameInput="direction"
            handleChange={handleChange}/>

            <Buttons type="submit" content="Enviar" className="btn btn-primary"/>
        
        </Form>
    )
}

export default FormEmployed;  // Exporta el componente con mayúscula
