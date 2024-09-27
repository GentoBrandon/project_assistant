'use client';
import MainLayout from "@/components/template/principal/MainLayouts";
import FormLots from "@/components/template/formLots/FormLots";
import Title from "@/components/layouts/InputData/Title";

function RegisterLots(){
    return(
        <MainLayout>
            <Title title="Registro de Lote"/>
            <FormLots/>
        </MainLayout>
    )
}

export default RegisterLots;