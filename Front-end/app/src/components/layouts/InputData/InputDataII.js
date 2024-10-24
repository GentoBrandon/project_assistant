import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; 


function InputDataII ({name, type, placeholder, Feedback, as, idInput, nameInput, handleChange, value}) {
    //console.log(`Valor de ${nameInput}: ${value}`); 
    return (
        <Form.Group className="mb-3" as={as}>
                <Form.Label htmlFor={nameInput}>{name}</Form.Label>
                <Form.Control id={idInput} 
                name={nameInput} 
                type={type} 
                placeholder={placeholder} 
                onChange={handleChange} 
                value={value} 
                required />
                <Form.Control.Feedback type="invalid">{Feedback}</Form.Control.Feedback>
        </Form.Group>

    )
}

export default InputDataII;