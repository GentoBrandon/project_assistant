'use client';
import InputDataII from '@/components/layouts/InputData/InputDataII';
import Styles from '../../../styles/FormStyles.module.css';
import Buttons from '@/components/layouts/InputData/Buttons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";



function UpdateActivities({edit}){
    const router = useRouter();
    const [Actividad, setActivities] = useState({
      name_activity: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/activities/searchData/${edit}`)
            .then(response => {
                const actividad = response.data.data;
                setActivities({
                    name_activity: actividad.name_activity || ''
                });
               
            })
            .catch(error => {
                console.error('Error al obtener los datos de la actividad:', error);
    });
    }, [edit]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setActivities(prevState => ({
          ...prevState, 
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/activities/updateActivity/${edit}`, Actividad, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                toast.success("¡Actividad actualizada con éxito!", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-center",
                    transition: "bounceIn",
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>',
                    sonido: true,
                  });
                router.push('/Tables/viewActivities'); // Redirigir a la página principal
            })
            .catch(error => {
                toast.error("¡Error al actualizar!", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            });
    }
    return (
        <Form className={Styles.form} onSubmit={handleSubmit}>
            <InputDataII 
            type="text" 
            name="Actividad" 
            placeholder="Ingrese la actividad" 
            Feedback="Ingrese la actividad correctamente."
            idInput="name_activity"
            nameInput="name_activity"
            value={Actividad.name_activity}
            handleChange={handleChange}/>

            <Buttons className="btn btn-primary" type="submit" content="Actualizar" /> 
        </Form>

    )
}

export default UpdateActivities;