
import 'bootstrap/dist/css/bootstrap.min.css'; 
import InputDataII from '@/components/layouts/InputData/InputDataII';
import Buttons from '@/components/layouts/InputData/Buttons';
import styles from '../../../styles/FormStyles.module.css';

function FormEmployed() {  // El nombre empieza con mayúscula
    return(
        <form className={styles.form} >
            <InputDataII id="userName" type="text" placeholder="Nombre" name="Ingrese su nombre"/>

            <InputDataII id="lastName" type="text" placeholder="Apellido" name="Ingrese su apellido"/>
            
            <InputDataII id="dpi" type="text" placeholder="DPI" name="Ingrese su DPI"/>

            <InputDataII id="nomber_phone" type="text" placeholder="Numero de telefono." name="Ingrese su numero de Telefono" />

            <InputDataII id="nomber_NIT" type="text" placeholder="NIT" name="Ingrese su numero de NIT"/>

            <InputDataII id="direction" type="text" placeholder="Direccion" name="Ingrese su numero de NIT"/>

            <Buttons type="submit" content="Enviar" className="btn btn-primary"/>
        
        </form>
    )
}

export default FormEmployed;  // Exporta el componente con mayúscula
