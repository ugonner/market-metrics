import { Navbar, Container, Nav } from "react-bootstrap";
import { Outlet, NavLink, Link } from "react-router-dom";

export const UserLayout = () => {
  return (
    <div className="container">
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Loopify</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="row">
        <div className="col-3">
          
        <button className="btn btn-lg w-100 btn-primary btn-block">
                <Link style={{textDecoration: "none"}} state={{textDecoration: "none"}} to={'/set-metrics'}>Set Metrics</Link>
            </button>
            <button className="w-100 btn btn-lg btn-primary btn-block">
                <NavLink style={{textDecoration: "none"}} to={'/analytics/all'}>Analytics</NavLink>
            </button>
          <div className="col-12"></div>
        </div>
        <div className="col-sm-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
