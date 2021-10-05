import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import *  as ReactBoostrap from 'react-bootstrap';

class DoubleNavigationPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }

    render() {
        return(
            <ReactBoostrap.Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <ReactBoostrap.Container>
                    <ReactBoostrap.Navbar.Brand href="#home">2HDelivery</ReactBoostrap.Navbar.Brand>
                    <ReactBoostrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBoostrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBoostrap.Nav className="me-auto">
                        <ReactBoostrap.Nav.Link href="#features">Features</ReactBoostrap.Nav.Link>
                        <ReactBoostrap.Nav.Link href="#pricing">Pricing</ReactBoostrap.Nav.Link>
                        <ReactBoostrap.NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <ReactBoostrap.NavDropdown.Item href="#action/3.1">Action</ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Item href="#action/3.2">Another action</ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Item href="#action/3.3">Something</ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Divider />
                            <ReactBoostrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBoostrap.NavDropdown.Item>
                        </ReactBoostrap.NavDropdown>
                        </ReactBoostrap.Nav>
                        <ReactBoostrap.Nav>
                        <ReactBoostrap.Nav.Link href="#deets">More deets</ReactBoostrap.Nav.Link>
                        <ReactBoostrap.Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </ReactBoostrap.Nav.Link>
                        </ReactBoostrap.Nav>
                    </ReactBoostrap.Navbar.Collapse>
                </ReactBoostrap.Container>
            </ReactBoostrap.Navbar>
        );
    }
  }
  
export default DoubleNavigationPage;