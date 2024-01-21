import React from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({message}) => {

    //console.log("this is some bullshit")
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    console.log(message)
    return(
        <div className='message owner'>
            {/*<div className="messageInfo">
                <img src="https://images.pexels.com/photos/19795127/pexels-photo-19795127/free-photo-of-a-woman-in-a-suit-and-white-shirt-standing-in-the-park.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=""/>
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>hello</p>
                {<img src="https://images.pexels.com/photos/19795127/pexels-photo-19795127/free-photo-of-a-woman-in-a-suit-and-white-shirt-standing-in-the-park.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=""/>}
    </div>*/}
        </div>
    );
};

export default Message