import about_img from "../img/about.jpg";
import gallery_img from "../img/gallery.svg";
import archive_img from "../img/archive.png";
import device_img from "../img/device.png";
import format_img from "../img/format.png";
import view_img from "../img/view.png";
import fea_img from "../img/features.jpg";
import prof_img from "../img/profile.png";

import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default class Content extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            resultRequest: "",
            load: false,
            active: false,
            user: null
        }

        this.handleRequest = this.handleRequest.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            this.setState({ user });
        });
    }

    handleRequest(){
        this.setState({active: true});
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then(response => response.json())
            .then(json => this.setState({resultRequest: json, load: true}))
            .catch(error => console.log(error));
    }

    handleAuth(){
        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(result => console.log(result.user.email + " ha iniciado sesion"))
            .catch(error => console.log("Error " + error))
    }

    handleLogout(){
        const auth = getAuth();
        signOut(auth)
            .then(result => console.log(result.user.email + " ha salido"))
            .catch(error => console.log("Error " + error))
    }

    renderLoginButton(){
            // Si el usuario esta logueado
        if(this.state.user){
            return(
                <Col md={5} className="center_prof">
                    <img 
                        className="img_prof" 
                        src={this.state.user.photoURL} 
                        alt={this.state.user.displayName}
                    />

                    <p>Hola {this.state.user.displayName}</p>
                    <button onClick={this.handleLogout}>Salir</button>
                </Col>
            );
        } else {
            return(
                <Col md={5} className="center_prof">
                    <img className="img_prof" src={prof_img} alt="profile"/>
                    <p>Inicia Sesion</p>
                    <button onClick={this.handleAuth}>Login con Google</button>
                </Col>
            );
        }
    }

    tableResultRequest(){
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
                    this.state.resultRequest.slice(0, 10).map((value) => 
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

    

    render(){

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
            <Container onClick={()=>this.setState({active: false})} fluid className="cont_emergent">
                <div className="div_emergent">
                    {this.state.load === false ? loading : this.tableResultRequest()}
                </div>
            </Container>;
        
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
                                <button onClick={this.handleRequest}>solicitar</button>
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
                {this.state.active ? users : <div></div>}
                
                <Container fluid className="cont_login">
                
                    <Row className="justify-content-md-center">
                        <Col>
                            <p className="title_signin">Inicia sesion con Google para comenzar</p>
                            <p>
                                Necesitas iniciar sesion con google para acceder a tu galeria de
                                imagenes. Has click en el boton de login para iniciar sesion
                            </p>
                        </Col>
                        {this.renderLoginButton()}
                    </Row>
                    
                </Container>
            </div>
            
        );
    }
}