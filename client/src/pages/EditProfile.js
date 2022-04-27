import {
	//Button,
	Dialog,
	//DialogActions,
	DialogTitle,
	//Divider,
	Fab,
	FormControl,
	//FormHelperText,
	Grid,
	//IconButton,
	//InputAdornment,
	//InputLabel,
	//OutlinedInput,
	Stack,
	TextField,
} from "@mui/material";
import AvatarPicker from '../components/AvatarPicker';
import EditIcon from "@mui/icons-material/Edit";
//import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { gql, useApolloClient } from '@apollo/client';
//import shortid from 'shortid';
import { useAuthUser } from '../providers/AuthProvider';
import { useParams } from 'react-router-dom';
import {
    useNotifyError,
    useNotifySuccess,
} from '../providers/NotificationProvider';
import LoadingPage from './LoadingPage';

const fabStyle = {
	margin: 0,
	top: "auto",
	right: 20,
	bottom: 20,
	left: "auto",
	position: "fixed",
};

function EditProfile() {
    const authUser = useAuthUser();
    const [edit, setEdit] = useState(false);
    const [viewUser, setViewUser] = useState(null);
    const client = useApolloClient();
    const params = useParams();
    const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (params.username === authUser.username) {
            setViewUser(authUser);
        } else {
            loadViewUser();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);
    
    const loadViewUser = () => {
        client
            .query({
                query: gql`
            query {
                users(where: { username: { eq: "${params.username}" } }) {
                    email
                    id
                    firstName
                    lastName
                    avatar
                    username
                }
            }
        `,
            })
            .then((result) => {
                const retrievedProfile = result.data.users[0];
                if (retrievedProfile) {
                    setViewUser(retrievedProfile);
                } else {
                    notifyError('Could not load user profile from server.');
                }
            });
    };

    const editUser = (data) => {
        const {
            avatar,
            email,
            firstName,
            lastName,
            password,
            //rememberMe,
            username,
        } = data;

        client
        .mutate({
            mutation: gql`
            mutation {
                updateUser(
                    input: { 
                        userId:"${viewUser.id}",
                        firstName:"${firstName}",
                        lastName:"${lastName}",
                        avatar: "${avatar}"
                        email: "${email}"
                        firstName: "${firstName}"
                        lastName: "${lastName}"
                        password: "${password}"
                        username: "${username}"                        
                        newPassword: "${password}",
                        oldPassword: "${password}" }
                )
            }
        `,
        })
        .then((result) => {
            if (result.data.addUser === 'false') {
              //reject();
            } else {
              //logIn(email, password);
              //resolve();
            }
          });
    }


    if (!viewUser) {
        return <LoadingPage />;
    }

    return (
        <>
            <Fab
                style={fabStyle}
                color="primary"
                aria-label="edit"
                onClick={() => setEdit(true)}
            >
                <EditIcon />
            </Fab>
            <Dialog open={edit} onClose={() => setEdit(false)}>
				<DialogTitle>
					<Typography sx={{ fontSize: 30 }} color="primary">
						<b>Edit Profile</b>
					</Typography>
                    
				</DialogTitle>
                <FormControl fullWidth>
                    <Grid container padding={1} rowSpacing={3} alignItems="center">
                        <Grid item xs={12}>
                            <Grid container alignItems="center" padding={1} spacing={2}>
						        <Grid item xs={12}>
                                    <Stack>
									    <AvatarPicker/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={2}>
                                        <TextField
                                            variant="outlined"
                                            defaultValue={viewUser.username}
                            
                                            label="Username"
                        
                                        />
                                        <TextField
                                            variant="outlined"
                                            defaultValue={viewUser.firstName}

                                            label="First Name"                            
                        
                                        />
                                        <TextField
                                            variant="outlined"
                                            defaultValue={viewUser.lastName}

                                            label="Last Name"                         
                                        />                        
                                    </Stack>

                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormControl>
            </Dialog>
        </>
    );
}
export default EditProfile;