'use client';
import UpdateEmployed from '@/components/template/FormActualizar/updateEmployed';
import MainLayout from '@/components/template/principal/MainLayouts';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function EmployeDetail({params}) {
  return (
    <MainLayout>
      <h1>Editar Empleado</h1>
      <UpdateEmployed edit={params.edit} />
    </MainLayout>
  );
}

export default EmployeDetail;
