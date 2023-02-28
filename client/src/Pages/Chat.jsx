import { Box } from "@chakra-ui/react"
import SideDrawer from "../Components/SideDrawer"
import { ChatState } from "../Context/ChatProvider"
import ChatBox from "../Components/ChatBox"
import Mychats from "../Components/Mychats"
import { useContext } from "react"

function Chat (){
    // const {user} = useContext()
    // console.log(user);
    return (
        <div style={{width:"100%"}}>
          <SideDrawer/>
            <Box
                d='flex'
                justifyContent={'space-between'}
                w='100%'
                p='10px'
            >
              <ChatBox/>
              <Mychats/>
            </Box>
        </div>
    )
}
export default Chat