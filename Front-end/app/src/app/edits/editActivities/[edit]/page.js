'use client';
import MainLayout from "@/components/template/principal/MainLayouts";
import Title from "@/components/layouts/InputData/Title";
import UpdateAct from "@/components/template/FormActualizar/updateActivities";
function UpdateActivities({params}){
    return(
        <MainLayout>
            <Title title="Actualizar Actividades"/>
            <UpdateAct edit={params.edit}/>
        </MainLayout>

    )
}
export default UpdateActivities;