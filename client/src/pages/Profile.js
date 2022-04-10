import React from 'react';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tabs, Tab } from '@mui/material';
//import { styled } from '@mui/material/styles';
//import { red } from '@mui/material/colors';
import {
	Avatar,
	//Grid,
//	Paper,
//	Table,
//	TableBody,
//	TableContainer,
//	TableHead,
//    Tab,
	Typography,
} from "@mui/material";
//import { usePosts } from '../providers/PostProvider';
//import PostCard from '../components/PostCard';

function Profile() {
   // const data = usePosts();
    const [activeTabNumber, setActiveTabNumber] = React.useState("1");

    const handleTabChange = (event, newValue) => {
        setActiveTabNumber(newValue);
    };
    return(    
        <Container>
            <Stack
                direction = "column"
                spacing={5} 
                padding={10}  
                alignItems = "center"
                //justifyContent="flex-end" 
            >
                <Avatar
                    src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    sx={{ 
                        width: 200,
                        height: 200, 
                        //borderRadius: "16px",
                        //border: 4,
                    }}
                ></Avatar>
                <Typography>
                    Kasie
                </Typography>
            </Stack>
            <TabContext value={activeTabNumber}>
                <Box 
                    sx={{ borderBottom: 1,
                    borderColor: "divider" }}
                >
                    <Stack direction="row">
	                    <TabList
			    			onChange={handleTabChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
					    >
					    	<Tab label="Posts" value="1" />
    						<Tab label="Groups" value="2" />
	    				</TabList>
		    		</Stack>
                </Box>
                <TabPanel value="1">



                    <Typography>
                        Tab1
                    </Typography>


                </TabPanel>
                <TabPanel value="2">



                    <Typography>
                        Tab2
                    </Typography>


                </TabPanel>                
                
            </TabContext>    

        </Container>
        
    );

}
export default Profile;