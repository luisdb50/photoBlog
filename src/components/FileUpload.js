import React from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export class FileUpload extends React.Component{
    constructor(){
        super();
        this.state = {
            uploadValue: 0,
            picture: null
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event){
        const file = event.target.files['0'];
        const storage = getStorage();
        const storageRef = ref(storage, `fotos/${file.name}`);
        
        uploadBytesResumable(storageRef, file)
            .then(snapshot => { console.log(event);});
    }
    
    render(){
        return(
            <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br/>
                <input type="file" onChange={this.handleUpload}/>
                <br/>
                <img width="320" src={this.state.picture} alt="" />
            </div>
        );
    }
}