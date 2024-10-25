'use client';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from "next/navigation";
import styles from '../../../styles/FormStyles.module.css'; // Asegúrate de tener el archivo de estilos
import Buttons from '@/components/layouts/InputData/Buttons';   
import axios from 'axios';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";


function EditFormSubActivities({ edit }) {
    const router = useRouter();
    const [dynamicFields, setDynamicFields] = useState([{ name_sub_activity: '', description: '' }]);
    const [selectedActivity, setSelectedActivity] = useState('');

    useEffect(() => {
        // Obtener las subactividades asociadas a la actividad seleccionada (edit)
        axios.get(`http://localhost:5000/api/sub-activities/search-activity/${edit}`)
            .then(response => {
                setDynamicFields(response.data); // Asigna las subactividades recuperadas
            })
            .catch(error => {
                console.error('Error al obtener las subactividades:', error);
            });
            axios.get(`http://localhost:5000/api/activities/searchData/${edit}`)
            .then(response => {
                console.log(response.data.data.name_activity);
                setSelectedActivity(response.data.data.name_activity); // Asigna el nombre de la actividad
            })
            .catch(error => {
                console.error('Error al obtener la actividad:', error);
            });
        }, [edit]);

    // Manejar cambios en los campos dinámicos
    const handleFieldChange = (index, fieldName, value) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index] = {
            ...updatedFields[index],
            [fieldName]: value,
        };
        setDynamicFields(updatedFields);
    };

    // Manejar el envío de los datos editados
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos de subactividad estén completos
        if (dynamicFields.some(field => !field.name_sub_activity || !field.description)) {
            toast.warning("¡Todos los campos de subactividad son obligatorios!", {
                duration: 4000,
                progress: true,
                position: "bottom-center",
                transition: "bounceIn",
                sonido: true,
              });
            return;
        }

        // Enviar cada subactividad actualizada de forma individual
        for (const field of dynamicFields) {
            const dataToSubmit = {
                id: field.id, // ID de la subactividad
                name_sub_activity: field.name_sub_activity,
                description: field.description,
                id_actividad: edit, // Usar el ID de la actividad recibida en la prop `edit`
            };

            try {
                // Enviar los datos editados con axios
                await axios.put(`http://localhost:5000/api/sub-activities/update-sub-activity/${field.id}`, dataToSubmit);
                toast.success("¡La operación se realizó con éxito!", {
                    duration: 2000,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
                  router.push('/Tables/viewSubActivities'); 
            } catch (error) {
                toast.error("¡Error, verifique sus datos e intente de nuevo.!", {
                    duration: 2000,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            }
        }
    };

    return (
        <Form className={styles.form} onSubmit={handleSubmit}>
            <h1>Actividad: {selectedActivity}</h1>
            <div className="container mt-3">
                {dynamicFields.map((field, index) => (
                    <div key={index} className="container-lg p-1 g-col-6 mb-3">
                        <input
                            type="text"
                            name={`name_sub_activity-${index}`}
                            placeholder="Nombre de la sub-actividad"
                            required
                            value={field.name_sub_activity}
                            onChange={(e) => handleFieldChange(index, 'name_sub_activity', e.target.value)}
                            className="form-control mt-2"
                        />
                        <input
                            type="text"
                            name={`description-${index}`}
                            placeholder="Descripción de la sub-actividad"
                            required
                            value={field.description}
                            onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                            className="form-control mt-2"
                        />
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Buttons type="submit" content="Guardar Cambios" className="btn btn-primary" />
            </div>
        </Form>
    );
}

export default EditFormSubActivities;
