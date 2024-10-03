
import 'bootstrap/dist/css/bootstrap.min.css'; 
import InputDataII from '@/components/layouts/InputData/InputDataII';
import Buttons from '@/components/layouts/InputData/Buttons';
import styles from '../../../styles/FormStyles.module.css';
import { useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

function FormEmployed() {  
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        setValidated(true);
    }
    return(
        <Form className={styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
            <InputDataII id="userName" 
            type="text" 
            placeholder="Nombre" 
            name="Ingrese su nombre"
            Feedback="Ingrese su nombre."
            as={Col}
            />

            <InputDataII id="lastName" 
            type="text" 
            placeholder="Apellido" 
            name="Ingrese su apellido"
            Feedback="Ingres su apellido"
            as={Col}/>
            </Row>
            
            <InputDataII id="dpi" 
            type="text" 
            placeholder="DPI" 
            name="Ingrese su DPI"
            Feedback="Ingrese su DPI"/>

            <InputDataII id="nomber_phone" 
            type="text" 
            placeholder="Numero de telefono." 
            name="Ingrese su numero de Telefono" 
            Feedback="Ingrese su numero de Telefono"/>

            <InputDataII id="nomber_NIT" 
            type="text" 
            placeholder="NIT" 
            name="Ingrese su numero de NIT"
            Feedback="Ingrese su numero NIT"/>

            <InputDataII id="direction" 
            type="text" 
            placeholder="Direccion" 
            name="Ingrese su numero de NIT"
            Feedback="Ingrese su NIT"/>

            <Buttons type="submit" content="Enviar" className="btn btn-primary"/>
        
        </Form>
    )
}

export default FormEmployed;  // Exporta el componente con mayúscula
