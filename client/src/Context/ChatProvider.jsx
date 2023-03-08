import { Navigate, useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const ChatContext = createContext()

const ChatProvider = ({children}) =>{

    const navigate = useNavigate()
    const [user,setUser] = useState()
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        console.log(userInfo)
        if(!userInfo){
            // navigate("/")
            <Navigate to='/chat'/>
        }
        
    },[])
    return (
        <ChatContext.Provider value={{user,setUser}}>
            {children}
        </ChatContext.Provider>
    )

}

export const ChatState= () =>{
    return useContext(ChatContext)
    
}
export default ChatProvider;