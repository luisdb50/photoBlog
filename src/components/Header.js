import React from "react";
import { Navbar } from "react-bootstrap";


export default function Header(props) {
    

    return(
        <header className="content_header">
            <Navbar bg="dark">
              <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
        </header>
    );
}