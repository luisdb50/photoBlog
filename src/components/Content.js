import about_img from "../img/about.jpg";
import gallery_img from "../img/gallery.svg";

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
                <img className="img_style" src={about_img} alt="about"/>
                    <Col className="col_flex" xs={12} sm={11} md={11}>
                        <Col sm={6} md={5} className="cont_about">
                            <div className="cont_img_about">
                                <img className="img_style2" src={gallery_img} alt="gallery"/>
                            </div>
                            <p className="text_about">
                                Guarda tus imagenes favoritas de una manera facil y eficiente
                                con PhotoBlog. Aqui podras tener tu propia galeria con las imagenes
                                que jamas quieras perder en todos tus dispositivos.
                            </p>
                        </Col>                        
                    </Col>
                </Row>
                <Row className="content_features">
                    <Col>

                    </Col>

                    <Col>

                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        );
    }
}