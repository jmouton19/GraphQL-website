import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	//Divider,
	Fab,
	FormControl,
	FormHelperText,
	Grid,
	//IconButton,
	//InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	TextField,
} from "@mui/material";
import AvatarPicker from '../components/AvatarPicker';
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
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
import { stringToObject } from '../utils/utils';
import validator from 'validator';

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
    const [usernameError, setUsernameError] = useState({
        status: false,
        msg: '',
    });
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

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

    const validateUsername = () => {
        if (username === '') {
            setUsernameError({
                status: true,
                msg: 'Please enter a username',
            });
        return;
        }
        if (!validator.isAlphanumeric(username)) {
            setUsernameError({
                status: true,
                msg: 'No special characters allowed.',
        });
        return;
        }
        // on no error:
        setUsernameError({ status: false, msg: '' });
    };

    const editUser = (data) => {
        const {
            //avatar,
            //email,
            //firstName,
            //lastName,
            //oldPassword,
            //newPassword,
            username,
        } = data;
        console.log(viewUser.id);
        client
        .mutate({
            mutation: gql`
            mutation {
                updateUser(
                    input: { 
                        userId:"${viewUser.id}",
                        username: "${username}"
                    }
                )
            }
        `,
        })
        .then((result) => {
            console.log('here')
            const resultData = stringToObject(result.data.updateUser);
            if (resultData.success) {
            
            } else {
            console.error('error');
            }
        });
    };


    function completeEditUser() {
        const data = {
          //avatar: avatarUrl,
          //email,
          //firstName,
          //lastName,
            username,
        };
        editUser(data)
            //.then(() => notifySuccess('Updated successfully.'))
            //.catch(() => notifyError('Update up failed'));
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
                                        <AvatarPicker setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={2}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="username-input">Username</InputLabel>
                                            <OutlinedInput
                                                //variant="outlined"
                                                type="text"
                                                defaultValue={viewUser.username}
                                                onChange={(event) => {
                                                    setUsername(event.target.value);
                                                }}
                                                onBlur={validateUsername}                            
                                                label="Username" 
                                                error={usernameError.status}                       
                                        />
                                        </FormControl>
                                        {usernameError.status ? (
                                            <FormHelperText
                                                id="username-helper-text"
                                                sx={{
                                                    color: 'red',
                                                }}
                                            >
                                                {usernameError.msg}
                                            </FormHelperText>
                                        ) : null}                              
                                        <TextField
                                            variant="outlined"
                                            defaultValue={viewUser.firstName}
                                            onChange={(event) => {
												setFirstName(event.target.value);
											}}
                                            
                                            label="First Name"                         
                                        />
                                        <TextField
                                            variant="outlined"
                                            defaultValue={viewUser.lastName}
                                            onChange={(event) => {
												setLastName(event.target.value);
											}}
                                            label="Last Name"                         
                                        />                        
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                            </Grid>
                            <DialogActions>
                                <FormControl fullWidth>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Stack>
                                            <Button
                                               // onClick={() => setChangePassword(true)}
                                                variant="text"
                                                size="small"
                                            >
                                                Change password
                                            </Button>
                                            <Button
                                                //onClick={() => setConfirmDelete(true)}
                                                variant="text"
                                                size="small"
                                                color="error"
                                            >
                                                Delete account
                                            </Button>
                                        </Stack>
                                            <Button
                                                onClick={() => completeEditUser()}
                                                variant="contained"
                                                sx={{ borderRadius: "50%" }}
                                                //disabled={saveEditDisableChecks()}
                                            >
                                                <SaveIcon />
                                            </Button>
                                    </Stack>
                                </FormControl>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </FormControl>
            </Dialog>
        </>
    );
}
export default EditProfile;