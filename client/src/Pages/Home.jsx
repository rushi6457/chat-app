import {Container,Box,Text,Tabs,TabList,Tab,TabPanels,TabPanel} from "@chakra-ui/react";
import Login from "../Components/Login"
import Signup from "../Components/Signup"
function Home (){

    return (
        <Container maxW='xl' centerContent>
            <Box 
                d='flex'
                justifyContent='center'
                p='3'
                w='100%'
                bg='gray'
                m='40px 0 15px 0'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Text fontSize='2xl' fontFamily='roboto mono' textAlign='center'>Chat with your friends</Text>
            </Box>  
            <Box 
                color='black'
                bg='gray'
                w='100%'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Tabs variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab  
                            w='50%'
                            fontSize='2xl'  
                            fontFamily='roboto mono' >Login</Tab>
                        <Tab  
                            w='50%'
                            fontSize='2xl'  
                            fontFamily='roboto mono' >Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            <Signup/>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
            </Box>
        </Container>
    )
}
export default Home