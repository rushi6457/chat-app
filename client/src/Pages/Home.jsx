import {Container,Box,Text,Tabs,TabList,Tab,TabPanels,TabPanel} from "@chakra-ui/react";
import Login from "../Components/Login"
import Signup from "../Components/Signup"
function Home (){

    return (
        <Container maxW='lg' centerContent>
            <Box 
                d='flex'
                justifyContent='center'
                p='3'
                w='100%'
                bg='black'
                color='white'
                m='40px 0 15px 0'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Text 
                    fontSize='2xl' 
                    fontFamily='roboto mono' 
                    textAlign='center'>Chit Chat Adda</Text>
            </Box>  
            <Box 
                color='white'
                bg='black'
                w='100%'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Tabs variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab  
                            bg={'black'}
                            w='50%'
                            fontSize='xl'  
                            fontFamily='roboto mono' >Login</Tab>
                        <Tab  
                            bg={'black'}
                            w='50%'
                            fontSize='xl'  
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