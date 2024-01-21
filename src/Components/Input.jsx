import React, { useContext, useState } from "react";
import Img from "../img/Img.jpg"
import Attach from "../img/Attach.jpg"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, serverTimestamp, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { db, storage } from "../Firebase";
import { v4 as uuid } from "uuid";
import { uploadBytes, uploadBytesResumable } from "firebase/storage";
import { doc } from "firebase/firestore";
import { ref } from "firebase/storage";

const Input = () => {
    const [ text, setText] = useState("");
    const [ img, setImg] = useState(null);

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSend = async()=>{
        if(img){

            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on('state_changed', 
            (snapshot) => {
            }, 
                (error) => {
                    // Handle unsuccessful uploads
                    //setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );

        } else {
            console.log(data.chatId);
            console.log(data);
            // await updateDoc(doc(db, "chats", "sFLQEsIyHMRa4Mw2SnNvzcudsdb2Ir0jNN1o3oolI5DzEDvY"), {
            //     messages: arrayUnion({
            //         id: uuid(),
            //         text,
            //         senderId: currentUser.uid,
            //         date: Timestamp.now(),
            //     }),
            // });
        }

        // await updateDoc(doc(db, "userChats", currentUser.uid),{
        //     [data.chatId + ".lastMessage"]:{
        //         text
        //     },
        //     [data.chatId+".date"]: serverTimestamp(),
        // });

        // await updateDoc(doc(db, "userChats", data.user.uid),{
        //     [data.chatId + ".lastMessage"]:{
        //         text
        //     },
        //     [data.chatId+".date"]: serverTimestamp(),
        // });

        setText("")
        setImg(null)
    };
    return(
        <div className='input'>
            <input 
               type="text" 
               placeholder='Type Something...' 
               onChange={(e)=>setText(e.target.value)}
               value={text}
            />
            <div className="send">
                <img src={Attach} alt="" className="img-container"/>
                <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor="file">
                    <img src={Img} alt="" className="img-container" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>

    )
}

export default Input