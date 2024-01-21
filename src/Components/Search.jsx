import React, { useContext, useState } from "react";
import {db} from "../Firebase";
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc , addDoc} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    //console.log("this is some bullshit")
  
    const { currentUser } = useContext(AuthContext);
  
    const handleSearch = async () => {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      );
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {
        setErr(true);
      }
    };
  
    const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
    };
  
    const handleSelect = async () => {
      //check whether the group(chats in firestore) exists, if not create
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
        console.log(user);
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
  
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
          //create user chats
          await setDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId]: {
              userinfo : {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              },
              date : serverTimestamp()
            },
          });
  
          await setDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userinfo"]: {
              userinfo : {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              },
              date : serverTimestamp()
            },
          });
        }
      } catch (err) {
        console.log(err)
      }
  
      setUser(null);
      setUsername("")
    };
    return(
        <div className='search'>
            <div className="searchForm">
                <input type="text"
                placeholder='Find a user' 
                onKeyDown={handleKey}
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
            />
            </div> 
            {err && <span> User not found! </span>}
            {user && (
            <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>
            )}
        </div>
    );
};

export default Search