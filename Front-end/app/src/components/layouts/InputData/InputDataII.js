import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; 


function InputDataII ({name, type, placeholder, Feedback, as, idInput, nameInput, handleChange}) {
    
    return (
        <Form.Group className="mb-3" as={as}>
                <Form.Label name={nameInput}>{name}</Form.Label>
                <Form.Control id={idInput} name={nameInput} type={type} placeholder={placeholder} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">{Feedback}</Form.Control.Feedback>
        </Form.Group>

    )
}

export default InputDataII;