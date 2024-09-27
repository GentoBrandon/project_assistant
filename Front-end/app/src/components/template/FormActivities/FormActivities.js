import InputDataII from "@/components/layouts/InputData/InputDataII"
import Buttons from "@/components/layouts/InputData/Buttons"
import Styles from '../../../styles/FormStyles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function Activities(){
    return (
        <form className={Styles.form}>
            <InputDataII type="text" name="Actividad" placeholder="Ingrese la actividad" />
            <Buttons className="btn btn-primary" type="subtmit"content="Enviar" /> 
            
        </form>
    )
}

export default Activities;