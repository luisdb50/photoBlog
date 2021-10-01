import "../css/style.css";

import React from "react";
import Header from "./Header";
import Content from "../components/Content";

export default class Page extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="content_main">
                <Header />
                <Content />
                <footer className="content_footer">

                </footer>
            </div>
        );
    }
}