'use client';

import Title from "@/components/layouts/InputData/Title";
import MainLayout from "@/components/template/principal/MainLayouts";
import UpdateLots from "@/components/template/FormActualizar/updateLot";
function EditLots ({params}){
    return(
        <MainLayout>
            <Title title="Editar Lote"/>
            <UpdateLots edit={params.edit}/>
        </MainLayout>
    )
}
export default EditLots;