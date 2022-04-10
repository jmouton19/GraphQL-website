import React from 'react';
//import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
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
	Typography,
} from "@mui/material";
//import { usePosts } from '../providers/PostProvider';
//import PostCard from '../components/PostCard';

function Profile() {
   // const data = usePosts();
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
                        width: 100,
                        height: 100, 
                        //borderRadius: "16px",
                        //border: 4,
                    }}
                ></Avatar>
                <Typography>
                    Kasie
                </Typography>
            </Stack>
        </Container>
        
    );

}
export default Profile;