import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import *  as ReactBoostrap from 'react-bootstrap';
import {
    whiteColor,
    blackColor,
    orangeColor
} from '../../contants';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter 
} from "react-router-dom";
const localStorage = require('local-storage');

class DoubleNavigationPage extends React.Component {
    render() {
        return(
            <ReactBoostrap.Navbar collapseOnSelect expand="lg" bg={orangeColor} variant="light" style = {{backgroundColor: orangeColor}}>
                <ReactBoostrap.Container>
                    <ReactBoostrap.Navbar.Brand><Link style = {{textDecoration: "none", color: blackColor}} to = '#'>2HDelivery for driver</Link></ReactBoostrap.Navbar.Brand>
                    <ReactBoostrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBoostrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBoostrap.Nav className="me-auto">
                        <ReactBoostrap.Nav.Link><Link style = {{textDecoration: "none", color: blackColor}} to = '#'>Trang chủ</Link></ReactBoostrap.Nav.Link>
                        <ReactBoostrap.Nav.Link href="#pricing"></ReactBoostrap.Nav.Link>
                        <ReactBoostrap.NavDropdown title="Đơn hàng" id="collasible-nav-dropdown">
                            <ReactBoostrap.NavDropdown.Item><Link style = {{textDecoration: "none", color: blackColor}} to = '#'>Đơn hàng của bạn</Link></ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Item><Link style = {{textDecoration: "none", color: blackColor}} to = '#'>Đơn hàng hiện có</Link></ReactBoostrap.NavDropdown.Item>
                        </ReactBoostrap.NavDropdown>
                        </ReactBoostrap.Nav>
                        <ReactBoostrap.Nav>
                        <ReactBoostrap.NavDropdown title="Người dùng" id="collasible-nav-dropdown">
                            <ReactBoostrap.NavDropdown.Item><Link style = {{textDecoration: "none", color: blackColor}} to = '#'>Thông tin tài xế</Link></ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Item><button style = {{
                                borderWidth: '0px',
                                backgroundColor: 'auto',
                                width: '200px',
                                borderRadius: '20px',
                                backgroundColor: orangeColor
                            }} onClick = {() => {
                                this.props.history.push('/')
                            }}>Đăng xuất</button></ReactBoostrap.NavDropdown.Item>
                        </ReactBoostrap.NavDropdown>
                        </ReactBoostrap.Nav>
                    </ReactBoostrap.Navbar.Collapse>
                </ReactBoostrap.Container>
            </ReactBoostrap.Navbar>
        );
    }
}

export default withRouter(DoubleNavigationPage);