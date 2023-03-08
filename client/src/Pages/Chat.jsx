import { Box } from "@chakra-ui/react"
import SideDrawer from "../Components/SideDrawer"
import { ChatState } from "../Context/ChatProvider"
import ChatBox from "../Components/ChatBox"
import Mychats from "../Components/Mychats"
import { useContext } from "react"

function Chat (){
    const {user} = ChatState()
    console.log(user);
    return (
        <div style={{width:'100%'}}>
            
          {user ? <SideDrawer user = {user} /> : null}
            <Box
                d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px"
            >
              {user ? <ChatBox/>: null}
              {user ? <Mychats/>: null} 
             </Box>
        </div>
    )
}
export default Chat