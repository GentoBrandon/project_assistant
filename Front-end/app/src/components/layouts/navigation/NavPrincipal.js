'use client';  // Esto marca el componente como Client Component

import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Profile from '../../../components/layouts/navigation/Profile'

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
          <Image src="/logo-anacafe.jpg" thumbnail />
        </Col>
      <Container>
        <Navbar.Brand href="#home">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Registrar</Nav.Link>
            <Nav.Link href="#link">Reportes</Nav.Link>
            <NavDropdown title="Configuraciones" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                No.01
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">No.02</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                No.03
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
