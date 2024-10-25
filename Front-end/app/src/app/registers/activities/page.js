'use client';
import MainLayout from "@/components/template/principal/MainLayouts";
import FormActivities from "@/components/template/FormActivities/FormActivities";
import Title from "@/components/layouts/InputData/Title";

function Activities(){
    return (
        <MainLayout>
            <Title title="Registro actividad"/>
            <FormActivities />
        </MainLayout>
    )
}

export default Activities;