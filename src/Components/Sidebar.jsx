import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = () => { 
    // console.log("this is some bullshit")
    return (
        <div className='sidebar'>
            <Navbar/>
            <Search/>
            <Chats/>
        </div>
    )
}

export default Sidebar