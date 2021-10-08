import about_img from "../img/about.jpg";
import gallery_img from "../img/gallery.svg";
import archive_img from "../img/archive.png";
import device_img from "../img/device.png";
import format_img from "../img/format.png";
import view_img from "../img/view.png";
import fea_img from "../img/features.jpg";

import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default class Content extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <Container fluid className="content_body">
                <Row className="body_about">
                    <img className="bg_about_img" src={about_img} alt="about"/>
                    <Col className="col_flex" xs={12} sm={11} md={11}>
                        <Col sm={6} md={5} className="cont_about">
                            <div className="cont_img_about">
                                <img className="img_style2" src={gallery_img} alt="galeria"/>
                            </div>
                            <p className="text_about">
                                Guarda tus imagenes favoritas de una manera facil y eficiente
                                con PhotoBlog. Aqui podras tener tu propia galeria con las imagenes
                                que jamas quieras perder en todos tus dispositivos.
                            </p>
                        </Col>                        
                    </Col>
                </Row>
                <Row className="body_features">
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
        );
    }
}