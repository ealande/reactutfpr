import './App.css'
import { Navbar, Nav, Container } from 'react-bootstrap'
import RotaPage from './utils/RotaPage'

function App() {

  return (
    <>
      <div className={'container'}>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">App UTFPR</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
              <Nav.Link href="/cliente">Cliente</Nav.Link>
              <Nav.Link href="/lista-cliente">Lista Cliente</Nav.Link>
              <Nav.Link href="/produto">Produto</Nav.Link>
              <Nav.Link href="/lista-produto">Lista Produto</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <RotaPage></RotaPage>
      </div >
    </>
  )
}

export default App
