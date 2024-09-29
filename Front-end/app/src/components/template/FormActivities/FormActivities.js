import InputDataII from "@/components/layouts/InputData/InputDataII"
import Buttons from "@/components/layouts/InputData/Buttons"
import Styles from '../../../styles/FormStyles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';    
import { useState } from 'react';
function Activities(){
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
        <Form className={Styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
            <InputDataII type="text" name="Actividad" placeholder="Ingrese la actividad" />
            <Buttons className="btn btn-primary" type="submit" content="Enviar" /> 
        </Form>
    )
}

export default Activities;