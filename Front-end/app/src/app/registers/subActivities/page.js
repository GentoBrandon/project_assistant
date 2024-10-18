'use client';
import Title from "@/components/layouts/InputData/Title";
import MainLayout from "@/components/template/principal/MainLayouts";
import FormSubActivities from "@/components/template/FormActivities/FormSubActivities";

function SubActivities(){
    return (
        <MainLayout>
            <Title title="Sub-actividades" />
            <FormSubActivities />
        </MainLayout>
    )
}

export default SubActivities;