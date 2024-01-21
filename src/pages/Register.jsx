import React from "react";
import Add from "../img/addAvatar.jpg"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, storage, db } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { doc, setDoc, addDoc, collection, updateDoc} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        console.log(email)
        console.log(password)

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);


            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
            (snapshot) => {
            }, 
                (error) => {
                    // Handle unsuccessful uploads
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await addDoc(collection(db, "users"),{
                            displayName,
                            email,
                            photoURL: downloadURL
                        }).then(async function(docRef){
                            updateDoc(doc(db, "users", docRef.id),{
                                uid : docRef.id,
                            });
                        }
                        );
                        await addDoc(collection(db, "userChats"),{});
                        navigate("/");
                    });
                }
            );



        }
        catch (err) {
            console.log(err);
            setErr(true);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Let's Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="display email" />
                    <input type="password" placeholder="display password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" className="img-container" />
                        <span>Add an Avatar</span>
                    </label>

                    <button>Sign Up</button>
                    {err && <span>Something Went Wrong</span>}
                </form>
                <p>You do have an account? <Link to="/register">Login</Link></p>
            </div>
        </div>
    )
}

export default Register