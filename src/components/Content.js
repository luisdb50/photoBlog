import about_img from "../img/about.jpg";
import gallery_img from "../img/gallery.svg";
import archive_img from "../img/archive.png";
import device_img from "../img/device.png";
import format_img from "../img/format.png";
import view_img from "../img/view.png";
import fea_img from "../img/features.jpg";
import prof_img from "../img/profile.png";
import img_logo from "../img/logo.png"

import { FileUpload } from "./FileUpload";

import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function Content(){
    
    const [request, setRequest] = useState(null);
    const [active, setActive] = useState(false);
    const [load, setLoad] = useState(false);
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [gallery, setGallery] = useState(false);

    let img;

    if(user){
        img = user.photoURL;
    } else {
        img = "";
    }

    let loading =
            <div className="cont_figure_inactive">
                <div className="figure">
                    <div className="figure2">
                        <div className="figure3">
                        </div>
                    </div>
                </div>
                <p className="text_load">Cargando...</p>
            </div>;

    let users =
        <Container onClick={()=>setActive(false)} fluid className="cont_emergent">
            <div className="div_emergent">
                {load === false ? loading : tableResultRequest()}
            </div>
        </Container>;

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            setUser(user);
            if(user) setIsLogin(true)
            else setIsLogin(false)
            
        });
    });

    function handleRequest(){
        setActive(true);
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then(response => response.json())
            .then(json => {
                setRequest(json); setLoad(true);
            })
            .catch(error => console.log(error));
    }

    function handleAuth(e){
        e.target.disabled = true;

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(result => e.target.disabled = false)
            .catch(error => alert("Error " + error))
    }

    function handleLogout(){
        const auth = getAuth();
        signOut(auth)
            .then(result => console.log("Has salido"))
            .catch(error => console.log("Error " + error))
    }

    function renderLoginButton(){
            // Si el usuario esta logueado
        if(user){
            return(
                <Col md={5} className="center_prof">
                    <img 
                        className="img_prof" 
                        src={user.photoURL} 
                        alt={user.displayName}
                    />

                    <p>Hola {user.displayName}</p>
                    <button onClick={handleLogout}>Salir</button>
                </Col>
            );
        } else {
            return(
                <Col md={5} className="center_prof">
                    <img className="img_prof" src={prof_img} alt="profile"/>
                    <p>Inicia Sesion</p>
                    <button onClick={handleAuth}>Login con Google</button>
                </Col>
            );
        }
    }

    function tableResultRequest(){
        return(
            <Table striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>title</th>
                        <th>completed</th>
                    </tr>
                </thead>
                <tbody>
                {
                request.slice(0, 10).map((value) => 
                    <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.title}</td>
                        <td>{value.completed.toString()}</td>
                    </tr>)
                }
                </tbody>
            </Table>
        );
    }

    function renderContentPage(){
        return(
            <div>
                <Container fluid className="content_body" id="home">
                    <Row className="body_about" id="about">
                        <img className="bg_about_img" src={about_img} alt="about"/>
                        <Col className="col_flex" xs={12} sm={11} md={11}>
                            <Col sm={6} md={5} className="cont_about">
                                <div className="cont_img_about">
                                    <img className="img_style2" src={gallery_img} alt="galeria"/>
                                </div>
                                <p className="text_about">
                                    Bienvenido a PhotoBlog. Has click en el boton de solicitar si quieres
                                    ver las primeras diez personas que se han registrado
                                    en PhotoBlog.
                                </p>
                                <button onClick={handleRequest}>solicitar</button>
                            </Col>                        
                        </Col>
                    </Row>
                    <Row className="body_features" id="features">
                        <Col xs={8} sm={5} lg={3}>
                            <img className="img_style3" src={archive_img} alt="archivo" />
                            <p className="title_fea">Protege</p>
                            <p className="text_features">
                                Manten protegidas tus imagenes con PhotoBlog contra la
                                perdida de datos. Una vez almacena la imagen en tu galeria
                                nunca la perderas de vista.
                            </p>
                        </Col>
                        <Col xs={8} sm={5} lg={3}>
                            <img className="img_style3" src={view_img} alt="vista" />
                            <p className="title_fea">Galeria</p>
                            <p className="text_features">
                                Disfruta de una elegante galeria donde podras visualizar
                                todas las imagenes que has subido a una excelente calidad
                            </p>
                        </Col>
                        <Col xs={8} sm={5} lg={3}>
                            <img className="img_style3" src={device_img} alt="dispositivo" />
                            <p className="title_fea">Compatibilidad</p>

                            <p className="text_features">
                                PhotoBlog al ser una aplicacion web esta disponible para
                                todo dispositivo que contenga un navegador instalado asi que
                                podras acceder a tus imagenes desde tu pc, telefono, smartTv
                                y muchos dispositivos mas.
                            </p> 
                        </Col>
                        <Col xs={8} sm={5} lg={3}>
                            <img className="img_style3" src={format_img} alt="formato" />
                            <p className="title_fea">Diferentes formatos</p>
                            <p className="text_features">
                                Sube diferentes tipos de archivos de imagenes gracias a la
                                gran compatibilidad con los diferentes formatos que admite PhotoBlog
                            </p>
                        </Col>
                    <img className="bg_fea_img" src={fea_img} alt="about"/>
                    </Row>
                </Container>
                {active ? users : <div></div>}
                
                <Container fluid className="cont_login" id="login">
                
                    <Row className="justify-content-md-center">
                        <Col>
                            <p className="title_signin">Inicia sesion con Google para comenzar</p>
                            <p className="text_signin">
                                Necesitas iniciar sesion con google para acceder a tu galeria de
                                imagenes. Has click en el boton de login para iniciar sesion
                            </p>
                        </Col>
                        {renderLoginButton()}
                    </Row>
                    
                </Container>
            </div>
        );
    }

    function renderGaleryPage(){
        

        
        return(
            <FileUpload/>
        );
    }

    return(
        <div>
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
                            {isLogin === false
                                ? <Nav.Link href="#login">Acceder</Nav.Link>
                                : <img className="img_prof2" 
                                    src={img} 
                                    alt="profile"/>
                            }
                            <Nav.Link 
                                onClick={()=> setGallery(false)} 
                                href="#home">
                                Inicio
                            </Nav.Link>
                            <Nav.Link 
                                onClick={()=> setGallery(true)} 
                                href="#home">
                                Galeria
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>
            </header>
            {gallery === false ? renderContentPage() : renderGaleryPage()}
        </div>
        
    );
}