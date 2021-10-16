import img_logo from "../img/logo.png"

import React from "react";
import { Nav, Navbar } from "react-bootstrap";


export default function Header(props) {
    

    return(
        <header className="content_header">
            <Navbar fixed="top" expand="sm" className="nav_content">
                <Navbar.Brand href="#home">
                    <img
                        alt="logo"
                        src={img_logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top sp"
                    />
                    <p className="ptitle">PhotoBlog</p>
                </Navbar.Brand>
                <Navbar.Toggle />
                
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="nav_links">
                        <Nav.Link href="#home">Acceder</Nav.Link>
                        <Nav.Link href="#home">Inicio</Nav.Link>
                        <Nav.Link href="#link">Galeria</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                
            </Navbar>
        </header>
    );
}