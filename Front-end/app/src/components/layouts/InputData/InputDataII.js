import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; 


function InputDataII ({name, type, placeholder, id, Feedback, as}) {
    
    return (
        <Form.Group className="mb-3" controlId={id} as={as}>
                <Form.Label>{name}</Form.Label>
                <Form.Control type={type} placeholder={placeholder}  required />
                <Form.Control.Feedback type="invalid">{Feedback}</Form.Control.Feedback>
        </Form.Group>

    )
}

export default InputDataII;