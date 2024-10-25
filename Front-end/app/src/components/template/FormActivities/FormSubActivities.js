import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Buttons from "@/components/layouts/InputData/Buttons";
import Styles from "../../../styles/selectStyles.module.css";
import StylesForm from "../../../styles/FormStyles.module.css";
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
function FormSubActivities() {
    const [Activities, setActivities] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([{ name_sub_activity: '', description: '' }]);
    const [selectedActivity, setSelectedActivity] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/activities/getdata')
            .then(response => {
                setActivities(response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    // Agregar nuevo campo dinámico
    const handleAddField = () => {
        setDynamicFields([...dynamicFields, { name_sub_activity: '', description: '' }]);
    };

    // Eliminar campo dinámico
    const handleRemoveField = (index) => {
        const updatedFields = dynamicFields.filter((_, i) => i !== index);
        setDynamicFields(updatedFields);
    };

    // Manejar cambios en los campos dinámicos
    const handleFieldChange = (index, fieldName, value) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index] = {
            ...updatedFields[index],
            [fieldName]: value,
        };
        setDynamicFields(updatedFields);
    };

    // Manejar cambio en la actividad seleccionada
    const handleActivityChange = (e) => {
        setSelectedActivity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que se haya seleccionado una actividad
        if (!selectedActivity) {
            toast.info("¡Tienes que seleccionar una actividad!", {
                duration: 2000,
                progress: true,
                position: "top-center",
                transition: "bounceIn",
                sonido: true,
              });
            return;
        }

        // Validar que todos los campos de subactividad estén completos
        if (dynamicFields.some(field => !field.name_sub_activity || !field.description)) {
            toast.warning("¡Todos los campos son obligatorios!", {
                duration: 2000,
                progress: true,
                position: "top-center",
                transition: "bounceIn",
                sonido: true,
              });
            return;
        }

        // Enviar cada subactividad de forma individual
        for (const field of dynamicFields) {
            const dataToSubmit = {
                name_sub_activity: field.name_sub_activity,
                description: field.description,
                id_actividad: selectedActivity,
            };

            try {
                // Enviar los datos con axios
                await axios.post('http://localhost:5000/api/sub-activities/insert-sub-activity', dataToSubmit);
                toast.success("¡Subactividades registradas correctamente!", {
                    duration: 1500,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            } catch (error) {
                toast.error("¡Error al ingresar subactividades!", {
                    duration: 4000,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sonido: true,
                  });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={StylesForm.form}>
            <h4>Seleccionar Actividad</h4>
            <Form.Select className={Styles.select} aria-label="Default select example" onChange={handleActivityChange}>
                <option>Seleccione una actividad</option>
                {Array.isArray(Activities) && Activities.map((item, index) => (
                    <option key={index} value={item.id}>{item.name_activity}</option>
                ))}
            </Form.Select>
            <br />
            <div >
                <h4>Ingrese sub-actividades</h4>
                <div className="container">
                    <button type="button" onClick={handleAddField} className="btn btn-primary">
                        Agregar Sub-actividad
                    </button>
                </div>
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
                            <button
                                type="button"
                                className="btn btn-danger mt-2"
                                onClick={() => handleRemoveField(index)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <Buttons className="btn btn-primary" type="submit" content="Registrar" />
                </div>
            </div>
        </form>
    );
}

export default FormSubActivities;
