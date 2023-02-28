import { Box, Button, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import {BsSearch} from "react-icons/bs"

const SideDrawer = () => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading,setLoading]= useState(false)
    const [loadingChat,setLoadingChat] = useState()
    return (
        <>
              Chat
            <Box>
                <Tooltip label='Search user'/>
                <Button>
                    <BsSearch fontSize={'50px'}/>    
                </Button>    
            </Box>      
        </>
    );
}

export default SideDrawer;
