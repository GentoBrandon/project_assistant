'use client';
import Title from "@/components/layouts/InputData/Title";
import Tables from "@/components/template/Tables/Tables";
import MainLayout from "@/components/template/principal/MainLayouts";

function ViewEmployeds() {
    return (
        <MainLayout>
            <Title title="Empleados" />
            <Tables />
        </MainLayout>
    );
}

export default ViewEmployeds;
