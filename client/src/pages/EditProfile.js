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
	IconButton,
	InputAdornment,
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
import { useAuthUser, useLoadUserProfile, useLogOut } from '../providers/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useNotifyError,
    useNotifySuccess,
} from '../providers/NotificationProvider';
import LoadingPage from './LoadingPage';
import { stringToObject } from '../utils/utils';
import validator from 'validator';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


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
    const navigate = useNavigate();
    const loadUserProfile = useLoadUserProfile();
    const logOut = useLogOut();
    const [edit, setEdit] = useState(false);
    const client = useApolloClient();
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
    const [changePassword, setChangePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
	const [passwordRepeated, setPasswordRepeated] = useState("");
	const [oldPassword, setOldPassword] = useState("");
    console.log(authUser.id);


    useEffect(() => {
        setFirstName(authUser.firstName);
        setLastName(authUser.lastName);
        setAvatarUrl(authUser.avatar);
        setPassword(authUser.password);
        setUsername(authUser.username);
        setEmail(authUser.email);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);

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

    const editUser = () => {
        client
        .mutate({
            mutation: gql`
            mutation {
                updateUser(
                    input: {
                        userId: ${authUser.id}
                        firstName: "${firstName}"
                        lastName: "${lastName}"
                        username: "${username}"
                        avatar: "${avatarUrl}"
                    }
                )
            }
        `,
        })
        .then((result) => {
            const userUpdated = stringToObject(result.data.updateUser);
            if (userUpdated.success === "true") {
                loadUserProfile(email, authUser.jwt).then((res) => {
                    if(res) {
                        navigate(`/profile/${username}`);
                    } else {
                        logOut();
                    }
                })
                notifySuccess(`${userUpdated.message}`);
            } else {
                notifyError(userUpdated.message);
            }
        });
    };

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
                                                defaultValue={authUser.username}
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
                                            defaultValue={authUser.firstName}
                                            onChange={(event) => {
												setFirstName(event.target.value);
											}}
                                            
                                            label="First Name"                         
                                        />
                                        <TextField
                                            variant="outlined"
                                            defaultValue={authUser.lastName}
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
                                                onClick={() => setChangePassword(true)}
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
                                                onClick={() => editUser()}
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
            <Dialog
				open={changePassword}
				onClose={() => setChangePassword(false)}
				fullWidth
			>
                <DialogTitle>Change Password</DialogTitle>
                <FormControl fullWidth>
                    <Stack padding={1} spacing={1}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="password-input">New Password</InputLabel>
                            <OutlinedInput
								id="password-input"
								type={showPassword ? "text" : "password"}
								name="password"
								autoComplete="new-password"
								onBlur={(event) => {
									setPassword(event.target.value);
								}}
								label="New Password"
								endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="password-repeat-input">
                                Repeat New Password
                                </InputLabel>
                                <OutlinedInput
                                    id="password-repeat-input"
                                    type={showPassword ? "text" : "password"}
                                    value={passwordRepeated}
                                    name="password"
                                    autoComplete="new-password"
                                    onChange={(event) => {
                                        setPasswordRepeated(event.target.value);
                                    }}
                                    label="Repeat New Password"
                                    error={password !== passwordRepeated}
                                />
                                {password !== passwordRepeated ? (
                                    <FormHelperText
                                        id="password-match-helper-text"
                                        sx={{
                                            color: "red",
                                        }}
                                    >
                                        Passwords do not match
                                    </FormHelperText>
                                ) : null}
                        </FormControl>
                    </Stack>
                </FormControl>
				<DialogActions>
					<FormControl fullWidth>
						<Stack direction="row" justifyContent="space-between">
							<Button type="text" onClick={() => setChangePassword(false)}>
								Cancel
							</Button>
							<Button
								//onClick={() => saveChangedDetails(true)}
								variant="contained"
								sx={{ borderRadius: "50%", height: 60, width: 60 }}
								//disabled={saveChangePasswordChecks()}
								//TODO:Add server communication and updating
							>
								<SaveIcon />
							</Button>
						</Stack>
					</FormControl>
				</DialogActions>
			</Dialog>
        </>
    );
}
export default EditProfile;