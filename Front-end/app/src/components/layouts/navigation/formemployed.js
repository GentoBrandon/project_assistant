import InputDataLayout from "@/components/layouts/InputData/InputDataLayout";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function formEmployed (){
    return(
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <InputDataLayout id="userName" type="text" placeholder="Enter your UserName" label="Nombre" />
            </Form.Group>
        </Form>
    )
}

export default formEmployed;