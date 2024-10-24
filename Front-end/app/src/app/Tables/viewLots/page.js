'user client';

const { default: Title } = require("@/components/layouts/InputData/Title");
const { default: MainLayout } = require("@/components/template/principal/MainLayouts");
const { default: TablesLots } = require("@/components/template/Tables/TablesLots");

function ViewLots() {
    return (
        <MainLayout>
            <Title title="Lotes" />
            <TablesLots />
        </MainLayout>
        
    );
}
export default ViewLots;