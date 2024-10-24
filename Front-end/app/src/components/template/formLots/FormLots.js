import InputDataII from "@/components/layouts/InputData/InputDataII";
import Styles from "@/styles/FormStyles.module.css";
import Buttons from "@/components/layouts/InputData/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Form } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import { toast } from "nextjs-toast-notify";

function Lots(){
    const [Lotes, setLots] = useState({
      name_lots: '',
      area: 0
    });

    const handleChange = (e) => {
      setLots({
          ...Lotes,
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
              const response = await axios.post('http://localhost:5000/api/lots/insertData', Lotes);
              toast.success("¡Lote registrado, correctamente!", {
                duration: 1500,
                progress: true,
                position: "top-center",
                transition: "bounceIn",
                sonido: true,
              });
          } catch (error) {
            toast.error("¡Error al registrar el lote!", {
                duration: 1500,
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
        <Form className={Styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
            <InputDataII  
            type="text" 
            placeholder="Nombre" 
            name="Ingrese el nombre del Lote" 
            Feedback="Ingrese correctamente el nombre"
            idInput="name_lots"
            nameInput="name_lots"
            handleChange={handleChange}/>

            <InputDataII
            type="number" 
            placeholder="Medida en Mts cuadrados" 
            name="Ingrese la medida"
            Feedback="Ingrese correctamente la medida."
            idInput="area"
            nameInput="area"
            handleChange={handleChange}/>
            
            <Buttons type="submit" content="Enviar" className="btn btn-primary"/>
            
        </Form>
    )
}

export default Lots;