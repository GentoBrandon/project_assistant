'use client';

import TheadTable from "@/components/layouts/InputData/TheadTable";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TBodyTable from "@/components/layouts/InputData/TBodyTable";


function Registers (){
    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        axios.get('http://localhost:5000/api/employees-activities/get-all')
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    },[]);
    return(
        <Table responsive>
            <TheadTable>
                <th>No.</th>
                <th>Nombre</th>
                <th>Actividad</th>
                <th>Subactividad</th>
                <th>Lote</th>
                <th>Fecha</th>
            </TheadTable>
            {Array.isArray(data) && data.map((item, index) => (
                <TBodyTable key={index}>
                    <td>{index + 1}</td>
                    <td>{item.employee_name}</td>
                    <td>{item.name_activity}</td>
                    <td>{item.name_sub_activity}</td>
                    <td>{item.name_lots}</td>
                    <td>{item.date}</td>
                    
                </TBodyTable>
            ))}
        </Table>

    )
}

export default Registers;