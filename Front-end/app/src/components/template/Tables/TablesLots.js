'use client';

import TheadTable from "@/components/layouts/InputData/TheadTable";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TBodyTable from "@/components/layouts/InputData/TBodyTable";


function TablesLots (){
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('http://localhost:5000/api/lots/getData')
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    },[]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/employed/deleteEmployed/${id}`)
            .then(response => {
                setData(data.filter(item => item.id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar el registro:', error);
            });
    };
    return (
        <Table responsive>
            <TheadTable>
                <th>No.</th>
                <th>Nombre</th>
                <th>Medida</th>
            </TheadTable>
            {Array.isArray(data) && data.map((item, index) => (
                <TBodyTable key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name_lots}</td>
                    <td>{item.area}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => router.push(`/editEmployed/${item.id}`)}>Editar</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </td>
                </TBodyTable>
            ))}
        </Table>

    )
}

export default TablesLots;