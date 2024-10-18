'use client';
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import TBodyTable from "@/components/layouts/InputData/TBodyTable";
import Table from "react-bootstrap/Table";
import ThTable from "@/components/layouts/InputData/ThTable";
import Buttons from "@/components/layouts/InputData/Buttons";
import TheadTable from "@/components/layouts/InputData/TheadTable";
function SubActivities(){
    const [Activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/activities/getdata')
            .then(response => {
                setActivities(response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    return(
        <>
        
        <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                {Array.isArray(Activities) && Activities.map((item, index) => (
                    <option key={index} value={item.id}>{item.name_activity}</option>
                ))}
        </Form.Select>
        <Table responsive>
            <TheadTable>
                <th>No.</th>
                <th>Nombre</th>
                <th>Descripción</th>
            </TheadTable>
            <TBodyTable>
            </TBodyTable>
        </Table>
        </>
    )
}
export default SubActivities;