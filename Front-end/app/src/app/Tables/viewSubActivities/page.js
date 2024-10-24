'use client';
import Title from "@/components/layouts/InputData/Title";
import MainLayout from "@/components/template/principal/MainLayouts";
import SubActivities from "@/components/template/Tables/SubActivities";
function ViewSubActivitiesPage() {
  return (
    <MainLayout>
        <Title title="Sub-Actividades" />
        <SubActivities />
    </MainLayout>
  );
}
export default ViewSubActivitiesPage;