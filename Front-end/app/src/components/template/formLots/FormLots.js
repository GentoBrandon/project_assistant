import InputDataII from "@/components/layouts/InputData/InputDataII";
import Styles from "@/styles/FormStyles.module.css";
import Buttons from "@/components/layouts/InputData/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css'; 


function Lots (){
    return(
        <form className={Styles.form}>
            <InputDataII id="name" type="text" placeholder="Nombre" name="Ingrese el nombre del lote"/>
            
            <InputDataII id="description" type="number" placeholder="Medida de en Mts cuadrados" name="Ingrese la medida"/>

            <Buttons type="submit" content="Enviar" className="btn btn-primary"/>
            
        </form>
    )
}

export default Lots;