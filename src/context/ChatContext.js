import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../Firebase.js";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext.js";

export const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId:"null",
        user:{}
    }
    console.log("as",currentUser)
    //console.log("this is some bullshit");

    const chatReducer = (state, action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,

                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    // console.log("this is some bullshit")

    console.log("state",state)
    return(
    <ChatContext.Provider value={{data:state, dispatch}}>
        {children}
    </ChatContext.Provider>
    );
};