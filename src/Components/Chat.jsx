import React, { useContext } from "react";
import Cam from "../img/Cam.jpg"
import Add from "../img/Add.jpg"
import More from "../img/More.jpg"
import Messages from "./Messages"
import Input from "./Input"
import { ChatContext } from "../context/ChatContext";


const Chat = () => {
    const {data} = useContext(ChatContext);
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt=""  className="img-container"/>
                    <img src={Add} alt="" className="img-container"/>
                    <img src={More} alt="" className="img-container"/>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat