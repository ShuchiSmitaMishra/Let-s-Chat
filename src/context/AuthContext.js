import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../Firebase.js";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    //console.log("this is some bullshit")

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            console.log("Users: ", user)
            setCurrentUser(user);
            console.log(currentUser)
        });

        return () =>{
          unsub();
        }
    }, []);

    return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    );
};