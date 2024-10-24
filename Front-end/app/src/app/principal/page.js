// src/pages/index.js
import MainLayout from '@/components/template/principal/MainLayouts';

export default function HomePage() {
  return (
    <MainLayout>
      <div>
        <h1>Bienvenido a la página principal</h1>
        <p>Este es el contenido de la página de inicio.</p>
      </div>
    </MainLayout>
  );
}
