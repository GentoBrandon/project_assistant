import InputDataII from "@/components/layouts/InputData/InputDataII"
import Buttons from "@/components/layouts/InputData/Buttons"
import Styles from '../../../styles/FormStyles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';    
import { useState } from 'react';
import axios from 'axios';

function Activities(){
    const [Actividad, setActivities] = useState({
      name_acitivity: ''
    });

    const handleChange = (e) => {
        setActivities({
            ...Actividad,
            [e.target.name]: e.target.value
        });
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }else{
        try {
          const response = axios.post('http://localhost:5000/api/activities/insertData', Actividad);
          console.log('Respuesta del servidor:', response.data);
        } catch (error) {
          console.error('Error al enviar los datos:', error);          
        }
      }
  
      setValidated(true);
    };
    return (
        <Form className={Styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
            <InputDataII 
            type="text" 
            name="Actividad" 
            placeholder="Ingrese la actividad" 
            Feedback="Ingrese la actividad correctamente."
            idInput="name_acitivity"
            nameInput="name_acitivity"
            handleChange={handleChange}/>

            <Buttons className="btn btn-primary" type="submit" content="Enviar" /> 
        </Form>
    )
}

export default Activities;