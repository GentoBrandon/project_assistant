'use client';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputDataII from '@/components/layouts/InputData/InputDataII';
import { useRouter } from "next/navigation";
import styles from '../../../styles/FormStyles.module.css';
import Buttons from '@/components/layouts/InputData/Buttons';   
import axios from 'axios';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";


function UpdateLots({edit}){
    const router = useRouter();
    const [formData, setFormData] = useState({
        name_lots: '',
        area: 0
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/lots/getData/${edit}`)
            .then(response => {
                const lote = response.data.data;
                setFormData({
                    name_lots: lote.name_lots || '',
                    area: lote.area || ''
                });
                console.log('Datos del lote actualizados en el formulario:', lote);
            })
            .catch(error => {
                console.error('Error al obtener los datos del lote:', error);
            });
    }, [edit]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
          ...prevState, 
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/lots/updateData/${edit}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                router.push('/Tables/viewLots'); // Redirigir a la página principal
                toast.success("¡Lote actualizada con éxito!", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            })
            .catch(error => {
                console.error('Error al actualizar los datos:', error);
                toast.error("¡Error al actualizr!", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            });
    };

    return(
        <Form className={styles.form} onSubmit={handleSubmit}>
            <InputDataII  
            type="text" 
            placeholder="Nombre" 
            name="Ingrese el nombre del lote" 
            Feedback="Ingrese correctamente el nombre"
            idInput="name_lots"
            nameInput="name_lots"
            value={formData.name_lots}
            handleChange={handleChange}/>

            <InputDataII
            type="number" 
            placeholder="Medida de en Mts cuadrados" 
            name="Ingrese la medida"
            Feedback="Ingrese correctamente la medida."
            idInput="area"
            nameInput="area"
            handleChange={handleChange}
            value={formData.area}
            />
            
            <Buttons type="submit" content="Actualizar" className="btn btn-primary"/>
            
        </Form>
    )
}
export default UpdateLots;