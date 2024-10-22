import InputDataII from "@/components/layouts/InputData/InputDataII"
import Buttons from "@/components/layouts/InputData/Buttons"
import Styles from '../../../styles/FormStyles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';    
import { useState } from 'react';
import axios from 'axios';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

function Activities(){
    const [Actividad, setActivities] = useState({
      name_activity: ''
    });

    const handleChange = (e) => {
        setActivities({
            ...Actividad,
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
          const response = await axios.post('http://localhost:5000/api/activities/insertData', Actividad);
          toast.success("¡Actividad registrada correctamente!", {
            duration: 1500,
            progress: true,
            position: "top-center",
            transition: "bounceIn",
            sonido: true,
          });
        } catch (error) {
          toast.error("¡Error al registrar la actividad!", {
            duration: 2000,
            progress: true,
            position: "top-center",
            transition: "bounceIn",
            sonido: true,
          });         
        }
      }
  
      setValidated(true);
    };
    return (
        <Form className={Styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
            <InputDataII 
            type="text" 
            name="Ingrese su actividad" 
            placeholder="Actividad" 
            Feedback="Ingrese la actividad correctamente."
            idInput="name_activity"
            nameInput="name_activity"
            handleChange={handleChange}/>

            <Buttons className="btn btn-primary" type="submit" content="Enviar" /> 
        </Form>
    )
}

export default Activities;