'use client';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import InputDataII from '@/components/layouts/InputData/InputDataII';
import { useRouter } from "next/navigation";
import styles from '../../../styles/FormStyles.module.css';
import Buttons from '@/components/layouts/InputData/Buttons';   
import axios from 'axios';

function UpdateEmployed({edit}) { // Recibe la prop 'edit'
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        dpi: '',
        number_IGGS: '',
        phone_number: '',
        number_NIT: '',
        direction: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/employed/searchEmployed/${edit}`)
            .then(response => {
                const empleado = response.data.data; // Asegúrate de acceder a 'data' dentro de 'response.data'
                setFormData({
                    name: empleado.name || '',
                    last_name: empleado.last_name || '',
                    dpi: empleado.dpi || '',
                    number_IGGS: empleado.number_IGGS || '',
                    phone_number: empleado.phone_number || '',
                    number_NIT: empleado.number_NIT || '',
                    direction: empleado.direction || ''
                });
                console.log('Datos del empleado actualizados en el formulario:', empleado);
            })
            .catch(error => {
                console.error('Error al obtener los datos del empleado:', error);
            });
    }, [edit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, // Mantiene los valores anteriores
            [name]: value // Actualiza solo el campo que cambió
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hacer la solicitud PATCH para actualizar los datos del empleado
        axios.patch(`http://localhost:5000/api/employed/updateEmployed/${edit}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                console.log('Empleado actualizado con éxito');
                router.push('/viewEmployeds'); // Redirigir a la página principal
            })
            .catch(error => {
                console.error('Error al actualizar los datos:', error);
            });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <InputDataII
                    type="text"
                    placeholder="Nombre"
                    idInput="name"
                    nameInput="name"
                    value= {formData.name} // Prellenar con los datos obtenidos
                    handleChange={handleChange} // Prellenar con los datos obtenidos
                    as={Col}
                />
                <InputDataII
                    type="text"
                    placeholder="Apellido"
                    idInput="last_name"
                    nameInput="last_name"
                    value={formData.last_name}  // Prellenar con los datos obtenidos
                    handleChange={handleChange}
                    as={Col}
                />
            </Row>

            <InputDataII
                type="text"
                placeholder="DPI"
                idInput="dpi"
                nameInput="dpi"
                value={formData.dpi}  // Prellenar con los datos obtenidos
                handleChange={handleChange}
            />

            <InputDataII
                type="text"
                placeholder="IGSS"
                idInput="number_IGGS"
                nameInput="number_IGGS"
                value={formData.number_IGGS}  // Prellenar con los datos obtenidos
                handleChange={handleChange}
            />

            <InputDataII
                type="text"
                placeholder="Número de teléfono"
                idInput="phone_number"
                nameInput="phone_number"
                value={formData.phone_number}  // Prellenar con los datos obtenidos
                handleChange={handleChange}
            />

            <InputDataII
                type="text"
                placeholder="NIT"
                idInput="number_NIT"
                nameInput="number_NIT"
                value={formData.number_NIT}  // Prellenar con los datos obtenidos
                handleChange={handleChange}
            />

            <InputDataII
                type="text"
                placeholder="Dirección"
                idInput="direction"
                nameInput="direction"
                value={formData.direction}  // Prellenar con los datos obtenidos
                handleChange={handleChange}
            />

            <Buttons type="submit" content="Actualizar" className="btn btn-primary"/>
        </form>
    );
}

export default UpdateEmployed;
