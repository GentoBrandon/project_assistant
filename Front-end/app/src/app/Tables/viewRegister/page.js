import Title from "@/components/layouts/InputData/Title";
import MainLayout from "@/components/template/principal/MainLayouts";
import Registers from "@/components/template/Tables/Registers";

function viewRegister(){
    return (
        <MainLayout>
            <Title title="Registros" />
            <Registers />
        </MainLayout>
    )
}

export default viewRegister;