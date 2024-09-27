import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function InputDataII ({name, type, placeholder, id}) {
    return (
        <Form.Group className="mb-3" controlId={id}>
                <Form.Label>{name}</Form.Label>
                <Form.Control type={type} placeholder={placeholder} />
        </Form.Group>

    )
}

export default InputDataII;