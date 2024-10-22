'use client';
import Title from "@/components/layouts/InputData/Title";
import MainLayout from "@/components/template/principal/MainLayouts";
import UpdateSubAct from "@/components/template/FormActualizar/updateSubActivities";

function EditSubActivitiesPage({params}){
    return(
        <MainLayout>
            <Title title="Editar Sub-Actividades"/>
            <UpdateSubAct edit={params.edit}/>
        </MainLayout>
    )
}
export default EditSubActivitiesPage;