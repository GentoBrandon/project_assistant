import InputDataII from "@/components/layouts/InputData/InputDataII";
import Styles from "@/styles/FormStyles.module.css";
import Buttons from "@/components/layouts/InputData/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Form } from "react-bootstrap";
import { useState } from 'react';


function Lots (){
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
    return(
        <Form className={Styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
            <InputDataII id="name" 
            type="text" 
            placeholder="Nombre" 
            name="Ingrese el nombre del lote" 
            Feedback="Ingrese correctamente el nombre"/>
            
            <InputDataII id="description"
            type="number" 
            placeholder="Medida de en Mts cuadrados" 
            name="Ingrese la medida"
            Feedback="Ingrese correctamente la medida."/>

            <Buttons type="submit" content="Enviar" className="btn btn-primary"/>
            
        </Form>
    )
}

export default Lots;