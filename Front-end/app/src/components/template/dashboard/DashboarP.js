import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import style from '../../../styles/dashboard.module.css';
import Title from '@/components/layouts/InputData/Title';

function DashboardP() {
    const [employedCount, setEmployedCount] = useState(null);
    const [lotsCount, setLotsCount] = useState(null);
    const [activitiesCount, setActivitiesCount] = useState(null);
    const [subActivitiesCount, setSubActivitiesCount] = useState(null);
    const [register, setRegisterCount] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/employed/get-all-employees')
            .then(response => {
                if (response.data.length > 0 && response.data[0].count) {
                    setEmployedCount(response.data[0].count);
                }
                console.log("Empleados", response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });

        axios.get('http://localhost:5000/api/lots/get-count-lots')
            .then(response => {
                setLotsCount(response.data.count);
                console.log("lotes", response.data.count);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });

        axios.get('http://localhost:5000/api/activities/get-count-activities')
            .then(response => {
                setActivitiesCount(response.data.count);
                console.log("Actividades", response.data.count);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });

        axios.get('http://localhost:5000/api/sub-activities/get-count-sub-activities')
            .then(response => {
                setSubActivitiesCount(response.data.count);
                console.log("SubActividades", response.data.count);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });

        axios.get('http://localhost:5000/api/employees-activities/get-count-employees-activities')
            .then(response => {
                if (response.data.length > 0 && response.data[0].count) {
                    setRegisterCount(response.data[0].count);
                }
                console.log("Registros", response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    // Función para abrir la ruta en una nueva pestaña
    const handleButtonClick = (path) => {
        window.open(path, '_blank');
    };

    return (
        <>
            <div>
                <Title title="Dashboard" />
            </div>
            <div className={style.buttonContainer}>
                <button className={style.imageButton} onClick={() => handleButtonClick('/init-recognition')}>
                    <img src="/camara.png" alt="Facial Recognition" style={{ width: '100px', height: '100px' }} />
                    Reconocimiento Facial
                </button>

                <button className={style.imageButton} onClick={() => handleButtonClick('/asistent')}>
                    <img src="/bot.png" alt="Assistant" style={{ width: '100px', height: '100px' }} />
                    Asistente
                </button>
            </div>
            <div className={style.dashboardContainer}>
                <div className={style.dashboardCard}>
                    <h3>Empleados</h3>
                    <h4>{employedCount ? `${employedCount}` : '...'}</h4>
                </div>

                <div className={style.dashboardCard}>
                    <h3>Lotes</h3>
                    <h4>{lotsCount ? `${lotsCount}` : '...'}</h4>
                </div>

                <div className={style.dashboardCard}>
                    <h3>Actividades</h3>
                    <h4>{activitiesCount ? `${activitiesCount}` : '...'}</h4>
                </div>

                <div className={style.dashboardCard}>
                    <h3>Sub-actividades</h3>
                    <h4>{subActivitiesCount ? `${subActivitiesCount}` : '...'}</h4>
                </div>

                <div className={style.dashboardCard}>
                    <h3>Registros</h3>
                    <h4>{register ? `${register}` : '...'}</h4>
                </div>
            </div>
        </>
    );
}

export default DashboardP;
