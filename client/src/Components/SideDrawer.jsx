import { Box, Button, Menu, MenuButton, Text, Tooltip,MenuList,MenuItem, Divider, Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton ,Input,Flex,useToast} from '@chakra-ui/react';
import React, { useState ,useContext} from 'react';
import {BsSearch} from "react-icons/bs"
import {BellIcon,ChevronDownIcon} from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider"
import {Avatar} from "@chakra-ui/avatar";
import ProfileModal from "./ProfileModal";
import {useNavigate} from "react-router-dom";
import {useDisclosure} from "@chakra-ui/hooks"
import axios from 'axios'
import ChatLoading from "./ChatLoading" ;
import UserList from "./UserList"

const SideDrawer = ({user}) => {
    const navigate = useNavigate()
    const toast = useToast()
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading,setLoading]= useState(false)
    const [loadingChat,setLoadingChat] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef()
    const handleLogout = () =>{
        localStorage.removeItem("userInfo");
        navigate("/")
    }

    const handleSearch = async() =>{
        if(!search){
            toast({
                title:"Search field can't be empty",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'top-left'
            })
            return
        }
        try{
            setLoading(true)

            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.get(`http://localhost:5000/api/user/search=${search}`,config);
            console.log(data)
            setLoading(false)
            setSearchResults(data)
        }
        catch(error){
             toast({
                title:"Something went wrong",
                description: error.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:'top-left'
            })
        }
    }

    const accessChat = (id) =>{

    }
    return (
      <>
            <Box 
                display='flex'
                justifyContent={'space-between'}
                alignItems={'center'}
                bg='white'
                w='100%'
                p={'5px 10px 5px 10px'}
                borderWidth={'5px'}
            >
                <Tooltip label='Search user' hasArrow placement='bottom-end'>
                    <Button onClick={onOpen}>
                        <BsSearch fontSize={'20px'}/>    
                        <Text d={{base:'none',md:'flex'}} px='4'>Search user</Text>
                    </Button>   
                </Tooltip> 
                <Box>
                    <Text   fontFamily='roboto mono'  fontSize={'2xl'}>Chit Chat Adda</Text>
                </Box>
                <div>
                    <Menu>
                        <MenuButton>
                            <BellIcon fontSize={'2xl'} m='1'/>
                        </MenuButton>
                    </Menu>

                     <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                           <Avatar size='sm'/>
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user = {user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <Divider/>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                       
                    </Menu>
                </div>
            </Box>      
            <Drawer placement='left' onClose={onClose}isOpen={isOpen}>
                <DrawerOverlay/>
                  <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box display='flex' pb='2'>
                <Input placeholder='Search user'mr='2'value={search}onChange={(e)=>setSearch(e.target.value)} />
                <Button onClick={handleSearch}>Search</Button>
            </Box>
            {
                loading ? (
                    <ChatLoading/>
                ):(
                    searchResults?.map((el)=>(
                        <UserList
                        key = {user.id}
                        user={user}
                        handleFunction={()=>accessChat(user._id)}
                        />
                    ))
                )
            }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
            </Drawer>
    </>
    );
}

export default SideDrawer;
