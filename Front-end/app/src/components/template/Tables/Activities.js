'use client';
import TheadTable from "@/components/layouts/InputData/TheadTable";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TBodyTable from "@/components/layouts/InputData/TBodyTable";

function TableActivities(){
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('http://localhost:5000/api/activities/getdata')
            .then(Response => {
                setData(Response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            })
    }, []);

    const handleDelete = (id) =>{
        axios.delete(`http://localhost:5000/api/activities/deleteActivity/${id}`)
            .then(response => {
                setData(data.filter(item => item.id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar el registro:', error);
            });
    };

    return(
        <Table responsive>
            <TheadTable>
                <th>No.</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </TheadTable>
            {Array.isArray(data) && data.map((item, index) => (
                <TBodyTable key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name_activity}</td>
                    <td>
                        <button className="btn btn-warning me-2" onClick={() => router.push(`/edits/editActivities/${item.id}`)}>Editar</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </td>
                </TBodyTable>
            ))} 
        </Table>

    )
}
export default TableActivities;