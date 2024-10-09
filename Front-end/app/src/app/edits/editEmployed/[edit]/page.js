'use client';
import Title from '@/components/layouts/InputData/Title';
import UpdateEmployed from '@/components/template/FormActualizar/updateEmployed';
import MainLayout from '@/components/template/principal/MainLayouts';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function EmployeDetail({params}) {
  return (
    <MainLayout>
      <Title title="Actualizar Empleado" />
      <UpdateEmployed edit={params.edit} />
    </MainLayout>
  );
}

export default EmployeDetail;
