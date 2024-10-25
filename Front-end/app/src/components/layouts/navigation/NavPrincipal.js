'use client';  

import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Profile from '../../../components/layouts/navigation/Profile';

function NavPrincipal() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Este hook asegura que el componente solo se renderice en el lado del cliente
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // No renderizar en el lado del servidor
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Col xs={2} md={1}>
          <Image src="/logo-anacafe.webp" thumbnail loading="lazy" />
      </Col>
      <Container>
        <Navbar.Brand href="/dashboard">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Registrar</Nav.Link>
            <Nav.Link href="#link">Reportes</Nav.Link>

            <NavDropdown title="Reportes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Tables/viewEmployeds">
                Empleados
              </NavDropdown.Item>
              <NavDropdown.Item href="/Tables/viewLots">
                Lotes
              </NavDropdown.Item>
              <NavDropdown.Item href="/Tables/viewActivities">
                Actividades
              </NavDropdown.Item>
              <NavDropdown.Item href="/Tables/viewSubActivities">
                Sub-actividades
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Registrar" id="basic-nav-dropdown">
              <NavDropdown.Item href="/registers/registerEmployed">
                Empleados
              </NavDropdown.Item>
              <NavDropdown.Item href="/registers/registerLots">
              Lotes
              </NavDropdown.Item>
              <NavDropdown.Item href="/registers/activities">
                Actividad
              </NavDropdown.Item>
              <NavDropdown.Item href="/registers/subActivities">
                Sub-Actividad
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Profile/>
      </Container>
    </Navbar>
  );
}

export default NavPrincipal;
