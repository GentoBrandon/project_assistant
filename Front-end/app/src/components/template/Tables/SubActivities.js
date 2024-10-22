'use client';
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import TBodyTII from "@/components/layouts/InputData/TBodyTII";
import Table from "react-bootstrap/Table";
import TheadTable from "@/components/layouts/InputData/TheadTable";
import { Button } from "react-bootstrap";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import Styles from "../../../styles/selectStyles.module.css";

function SubActivities() {
    const [Activities, setActivities] = useState([]); // Para almacenar las actividades
    const [subActivities, setSubActivities] = useState([]); // Para almacenar las subactividades obtenidas
    const [selectedActivity, setSelectedActivity] = useState(null); // Para manejar la actividad seleccionada

    // Obtener las actividades al cargar el componente
    useEffect(() => {
        axios.get('http://localhost:5000/api/activities/getdata')
            .then(response => {
                setActivities(response.data.data); // Asume que el array de actividades viene en data.data
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    // Manejar el cambio de selección de actividad
    const handleActivityChange = (e) => {
        const activityId = e.target.value;
        setSelectedActivity(activityId);

        // Obtener las subactividades relacionadas con la actividad seleccionada
        if (activityId) {
            console.log(activityId);
            axios.get(`http://localhost:5000/api/sub-activities/search-activity/${activityId}`)
                .then(response => {
                    console.log(response.data);
                    setSubActivities(response.data); // Ajusta según el formato de respuesta de tu API
                })
                .catch(error => {
                    console.error('Error al obtener las sub-actividades:', error);
                });
        }
    };

    return (
        <>  
            <div className={Styles.container}>            
                <Form.Select className={Styles.select} aria-label="Seleccionar Actividad" onChange={handleActivityChange}>
                    <option>Seleccione una actividad</option>
                    {Array.isArray(Activities) && Activities.map((item, index) => (
                        <option key={index} value={item.id}>{item.name_activity}</option>
                    ))}
                </Form.Select>
                <div className={Styles.select}>
                    <Button className={Styles.btn} variant="primary" onClick={() => {
                        if (selectedActivity) {
                            window.location.href = `/edits/editSubActivities/${selectedActivity}`;
                        } else {
                            toast.error("¡Error, primero seleccione una actividad!", {
                                duration: 2000,
                                progress: true,
                                position: "top-center",
                                transition: "bounceIn",
                                sonido: true,
                            });
                        }
                    }}>Editar Subactividades</Button>
                </div>
            </div>


            {/* Tabla de Subactividades */}
            <Table responsive>
                <TheadTable>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                </TheadTable>
                <TBodyTII>
                    {Array.isArray(subActivities) && subActivities.length > 0 ? (
                        subActivities.map((subActivity, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{subActivity.name_sub_activity}</td>
                                <td>{subActivity.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>No hay subactividades disponibles</td>
                        </tr>
                    )}
                </TBodyTII>
            </Table>
        </>
    );
}

export default SubActivities;
