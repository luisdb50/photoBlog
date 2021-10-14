import about_img from "../img/about.jpg";
import gallery_img from "../img/gallery.svg";
import archive_img from "../img/archive.png";
import device_img from "../img/device.png";
import format_img from "../img/format.png";
import view_img from "../img/view.png";
import fea_img from "../img/features.jpg";

import { FileUpload } from "./FileUpload";

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
        this.handleClick = this.handleClick.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        //window.addEventListener('scroll', this.handleScroll);

        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            this.setState({ user });
        });
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e){
        alert("scroll");
    }

    handleRequest(){
        this.setState({active: true});
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then(response => response.json())
            .then(json => this.setState({resultRequest: json, load: true}))
            .catch(error => console.log(error));
    }

    handleClick(){
        this.setState({active: false});
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
                <div>
                    <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                    <p>Hola {this.state.user.displayName}</p>
                    <button onClick={this.handleLogout}>Salir</button>
                </div>
            );
        } else {
            return(
                <button onClick={this.handleAuth}>Login con Google</button>
            );
        }
    }

    loading(){
        return(
            <div className="cont_figure_inactive">
                <div className="figure">
                    <div className="figure2">
                        <div className="figure3">
                        </div>
                    </div>
                </div>
                <p className="text_load">Cargando...</p>
            </div>
        );
    }

    result(){
        let result = this.state.resultRequest.slice(0, 10).map((value) => 
            <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.title}</td>
                <td>{value.completed.toString()}</td>
            </tr>
        );

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
                    {result}
                </tbody>
            </Table>
        );
    }

    viewUsers(){
        return(
            <Container onClick={this.handleClick} fluid className="cont_emergent">
                <div className="div_emergent">
                    {this.state.load === false ? this.loading() : this.result()}
                </div>
            </Container>
        );
    }

    render(){
        
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
                                    Has click en el boton de solicitar si quieres
                                    ver las primeras diez personas que se han registrado
                                    en PhotoBlog.
                                </p>
                                <button onClick={this.handleRequest}>solicitar</button>
                            </Col>                        
                        </Col>
                    </Row>
                    <Row className="body_features" id="features">
                    <img className="bg_fea_img" src={fea_img} alt="about"/>
                        <Col sm={6} lg={3}>
                            <img className="img_style3" src={archive_img} alt="archivo" />
                            <p className="title_fea">Protege</p>
                            <p className="text_features">
                                Manten protegidas tus imagenes con PhotoBlog contra la
                                perdida de datos. Una vez almacena la imagen en tu galeria
                                nunca la perderas de vista.
                            </p>
                        </Col>
                        <Col sm={6} lg={3}>
                            <img className="img_style3" src={view_img} alt="vista" />
                            <p className="title_fea">Galeria</p>
                            <p className="text_features">
                                Disfruta de una elegante galeria donde podras visualizar
                                todas las imagenes que has subido a una excelente calidad
                            </p>
                        </Col>
                        <Col sm={6} lg={3}>
                            <img className="img_style3" src={device_img} alt="dispositivo" />
                            <p className="title_fea">Compatibilidad</p>

                            <p className="text_features">
                                PhotoBlog al ser una aplicacion web esta disponible para
                                todo dispositivo que contenga un navegador instalado asi que
                                podras acceder a tus imagenes desde tu pc, telefono, smartTv
                                y muchos dispositivos mas.
                            </p> 
                        </Col>
                        <Col sm={6} lg={3}>
                            <img className="img_style3" src={format_img} alt="formato" />
                            <p className="title_fea">Diferentes formatos</p>
                            <p className="text_features">
                                Sube diferentes tipos de archivos de imagenes gracias a la
                                gran compatibilidad con los diferentes formatos que admite PhotoBlog
                            </p>
                        </Col>
                    </Row>
                </Container>
                {this.state.active ? this.viewUsers() : <div></div>}
                <Container fluid className="cont_login">
                    {this.renderLoginButton()}
                </Container>
                <Container>
                    <FileUpload />
                </Container>
            </div>
            
        );
    }
}