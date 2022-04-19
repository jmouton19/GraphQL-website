import React from 'react';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from '@mui/material';
import cheeseMarker from '../assets/cheese-pin.png';
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
import { usePosts } from '../providers/PostProvider';
import PostCard from '../components/PostCard';



function Profile() {
    const data = usePosts();
    const [activeTabNumber, setActiveTabNumber] = React.useState("1");

    const handleTabChange = (event, newValue) => {
        setActiveTabNumber(newValue);
    };
    return(    
        <Container>
            <Stack
                direction = "column"
                spacing={1}  
                mt={12} 
                alignItems = "center"
                //justifyContent="flex-end" 
            >
                <Avatar
                    src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    sx={{ 
                        width: 200,
                        height: 200, 
                        //borderRadius: "16px",
                        border: 4,
                        borderColor: "#ffc619",
                    }}
                ></Avatar>
                <Typography variant="h4"  >
                    Cheddar
                </Typography>
                <Stack
                direction = "row"
                spacing={0.2}  
                >
                    <img src={cheeseMarker} style={{ width: 25, height: 35, marginRight: 10 }} />
                    <Typography variant="h6">
                        Cape Town, South Africa
                    </Typography>
                </Stack>
                <Typography>
                    Bio ?
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
                    <Stack spacing={2}>
                        {data.map((postData) => (
                        <PostCard postData={postData} frameHeight="460" />
                        ))}
                    </Stack>
                </TabPanel>
                <TabPanel value="2">



                    <Typography>
                        Add groups
                    </Typography>


                </TabPanel>                
                
            </TabContext>    

        </Container>
        
    );

}
export default Profile;