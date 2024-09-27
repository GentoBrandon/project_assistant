import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from '../../../styles/FormStyles.module.css';
function Buttons({type, content, className}){
    return(
        <div className={styles.btn} >
            <button type={type} className={className}>{content}</button>
        </div>
    )
}
export default Buttons;