'use client';
import FormEmployed from '@/components/template/formEmployed/FormEmTemplate';
import MainLayout from '../../components/template/principal/MainLayouts';
import Title from '../../components/layouts/InputData/Title';

export default function HomePage() {
  return (
    <MainLayout>
        <Title title="Registro de Empleado"/>
        <FormEmployed/>
    </MainLayout>
  );
}
