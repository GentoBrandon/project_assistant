'use client';
import MainLayout from "@/components/template/principal/MainLayouts";
import Title from "@/components/layouts/InputData/Title";
import Activiti from "@/components/template/Tables/Activities";

function Activities(){
    return(
        <MainLayout>
            <Title title="Actividades"/>
            <Activiti/>
        </MainLayout>

    )
}

export default Activities;