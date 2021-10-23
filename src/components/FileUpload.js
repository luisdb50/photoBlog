import { getStorage, getDownloadURL ,ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc , serverTimestamp, getFirestore } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import axios from "axios";

export function FileUpload(){

    const [result, setResult] = useState([]);
    let elements = [];
    console.log("he cargado la pagina con el estado de : ");
    console.log(result);
    
    useEffect(()=> {queryImages()}, []);
    

    function handleUpload(e){
        const file = e.target.files['0'];
        const storage = getStorage();
        const storageRef = ref(storage, `fotos/${file.name}`);

        uploadBytesResumable(storageRef, file)
            .then( addDocument( 'files', { path: storageRef.fullPath }));
    }

    async function addDocument(nameCollect, data){
        
        const collect = collection( getFirestore(), nameCollect);
        let document = {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }

        try {
            const docRef= await addDoc( collect , document);
            console.log("Document written with ID: ", docRef.id);
        } catch(e) {
            console.error("Error adding document: ", e);
        }
    }

    async function queryImages(){ 
        const querySnapshot = await getDocs(collection( getFirestore(), 'files' ));
        querySnapshot.forEach(doc =>{
            getDownloadURL(ref( getStorage(), doc.data().path))
                .then((url) => {
                    
                    //const xhr = new XMLHttpRequest();
                    //xhr.responseType = 'blob';
                    
                    //xhr.onload = (event) => {
                    //onst blob = xhr.response;
                    //};
                    //xhr.open('GET', url);;
                    //xhr.send();

                    axios.get(url).then(()=>{
                        saveDataQuerry(url);
                        console.log("hecho");
                        
                    })

                }).catch(error =>{
                    alert("Error" + error);
                }
            );
        });

    }

    function saveDataQuerry(url){
        elements.push(url);
        setResult(elements.slice())
        console.log("he asignado el estado con : ");
        console.log(elements);
    }

    console.log("renderize la pagina con el estado en: ");
    console.log(elements);
    return(
        <div className="content_upload">
            <br/>
            <input type="file" onChange={handleUpload}/>
            <br/>
            {result.map((value, index)=>
                <img src={value} alt={"image" + index} key={index}/>
            )}
        </div>
    );
}