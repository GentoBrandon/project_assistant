'use client';
import InputDataII from '@/components/layouts/InputData/InputDataII';
import Styles from '../../../styles/FormStyles.module.css';
import Buttons from '@/components/layouts/InputData/Buttons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';


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
                console.log('Actividad actualizada con éxito');
                router.push('/Tables/viewActivities'); // Redirigir a la página principal
            })
            .catch(error => {
                console.error('Error al actualizar los datos:', error);
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