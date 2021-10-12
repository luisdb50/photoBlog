import about_img from "../img/about.jpg";
import gallery_img from "../img/gallery.svg";
import archive_img from "../img/archive.png";
import device_img from "../img/device.png";
import format_img from "../img/format.png";
import view_img from "../img/view.png";
import fea_img from "../img/features.jpg";

import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

export default class Content extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            resultRequest: "",
            load: false,
            active: "cont_emergent_inactive",
        }

        this.handleRequest = this.handleRequest.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        //window.addEventListener('scroll', this.handleScroll);

        
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e){
        alert("scroll");
    }

    handleRequest(){
        this.setState({active: "cont_emergent_active"});
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then(response => response.json())
            .then(json => this.setState({resultRequest: json, load: true}))
            .catch(error => console.log(error));
    }

    handleClick(){
        this.setState({active: "cont_emergent_inactive"});
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
        )

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

    render(){
        
        return(
            <div>
                <Container fluid className="content_body">
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
                <Container onClick={this.handleClick} fluid className={this.state.active}>
                    <div className="div_emergent">
                     {this.state.load === false ? this.loading() : this.result()}
                    </div>
                </Container>
            </div>
            
        );
    }
}