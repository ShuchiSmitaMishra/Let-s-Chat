import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {

    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    //console.log("this is some bullshit")

    useEffect(() => {
        console.log(currentUser.uid)
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                console.log(doc.data())
                setChats(doc.data())
                const data = doc.data();
                // if (data) {
                //     // Convert the object to an array of chats
                //     const chatsArray = Object.values(data);
                //     setChats(chatsArray);
                // } else {
                //     setChats([]); // Set an empty array if no data is available
                // }
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats()
    }, [currentUser.uid]);
    

    //console.log(Object.entries(chats));

    const handleSelect = (u) => {
        console.log("Prac: ", u)
        // console.log(u)
        dispatch({ type: "CHANGE_USER", payload: u })
    }
    return (
        <div className="chats">
            {Object.entries(chats)?.map((chat) => (
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userinfo)}>
                    <img
                        src="{chat[1].photoURL}"
                        alt=""
                    />
                    <div className="userChatInfo">
                        {/* <span>{chat[1].userinfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p> */}
                        {/* <p>{chat[1].userinfo}</p> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chats