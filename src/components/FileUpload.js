import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export function FileUpload(){
    
    const [uploadValue, setUploadValue] = useState(0);
    const [picture, setPicture] = useState(null);

    function handleUpload(e){
        const file = e.target.files['0'];
        const storage = getStorage();
        const storageRef = ref(storage, `fotos/${file.name}`);
        
        uploadBytesResumable(storageRef, file)
            .then(snapshot => { console.log(e);});
    }
    
    return(
        <div>
            <progress value={uploadValue} max="100"></progress>
            <br/>
            <input type="file" onChange={handleUpload()}/>
            <br/>
            <img width="320" src={picture} alt="" />
        </div>
    );
}