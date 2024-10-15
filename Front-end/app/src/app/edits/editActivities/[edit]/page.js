'use client';
import MainLayout from "@/components/template/principal/MainLayouts";
import Title from "@/components/layouts/InputData/Title";
function UpdateActivities(){
    return(
        <MainLayout>
            <Title title="Actualizar Actividades"/>
            <UpdateActivities edit={params.edit}/>
        </MainLayout>

    )
}
export default UpdateActivities;