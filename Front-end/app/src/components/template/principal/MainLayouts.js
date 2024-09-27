// src/layouts/MainLayout.js
import Navbar from '../../layouts/navigation/NavPrincipal';

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar/>
      <main style={{ marginTop: '80px' }}>
        {children}
      </main>
      <footer style={{ marginTop: '50px', padding: '20px', textAlign: 'center', background: '#f8f9fa' }}>
        <p>© 2024 Mi Empresa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

