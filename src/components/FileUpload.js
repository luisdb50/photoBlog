import { Col, Row } from "react-bootstrap";
import { getStorage, getDownloadURL ,ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc , serverTimestamp, getFirestore } from "firebase/firestore";
import { getDocs, orderBy, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import axios from "axios";

export function FileUpload(){

    const [result, setResult] = useState([]);
    let elements = [];
    
    useEffect(()=> {queryImages()}, []);
    

    function handleUpload(e){
        const file = e.target.files['0'];
        console.log(e.target.files['0'])
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
        let i = 0;
        const q = query(collection( getFirestore(), 'files' ), orderBy("createdAt"));
        onSnapshot(q, (querySnapshot)=>{
            querySnapshot.forEach(doc =>{
                console.log(doc.data().path);
                getDownloadURL(ref( getStorage(), doc.data().path))
                .then((url) => {
                    i++;
                    axios.get(url).then(() =>{
                        saveDataQuery(url);
                        console.log("===" + i);  
                        console.log(doc.data().path);                    
                    })
                });
            })
        })
    }

    function peticion(url, doc){

    }

    /*
    async function queryImages(){ 
        const querySnapshot = await getDocs(collection( getFirestore(), 'files' ));
        querySnapshot.forEach(doc =>{
            getDownloadURL(ref( getStorage(), doc.data().path))
                .then((url) => {
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
    */ 

    function saveDataQuery(url){
        elements.push(url);
        setResult(elements.slice())
    }

    return(
        <div className="content_upload">
            <Row>
                <Col>
                    <div className="content_gallery">
                        {result.map((value, index)=>
                            <img 
                                src={value} 
                                alt={"image" + index} 
                                key={index}
                                className="gallery_style"
                            />
                        )}
                    </div>
                </Col>
            </Row>
            <br/>
            <input type="file" onChange={handleUpload}/>
            <br/>
        </div>
    );
}