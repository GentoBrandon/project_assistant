'use client'
import TheadTable from "@/components/layouts/InputData/TheadTable";
import TBodyTable from "@/components/layouts/InputData/TBodyTable";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

function Tables() {
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('http://localhost:5000/api/employed/viewEmployed')
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/employed/deleteEmployed/${id}`)
            .then(response => {
                setData(data.filter(item => item.id !== id));
                toast.success("¡Empleado eliminado!", {
                    duration: 1500,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            })
            .catch(error => {
                toast.error("¡Error al eliminar!", {
                    duration: 1500,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            });
    };
    
    return (
        <Table responsive>
            <TheadTable>
                <th>No.</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DPI</th>
                <th>IGSS</th>
                <th>Telefono</th>
                <th>NIT</th>
                <th>Direccion</th>
                <th>Acciones</th>
            </TheadTable>
            {Array.isArray(data) && data.map((item, index) => (
                <TBodyTable key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.dpi}</td>
                    <td>{item.number_IGGS}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.number_NIT}</td>
                    <td>{item.direction}</td>
                    <td>
                        <button className="btn btn-warning me-2" onClick={() => router.push(`/edits/editEmployed/${item.id}`)}>Editar</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </td>
                </TBodyTable>
            ))}
        </Table>
    );
}

export default Tables;
