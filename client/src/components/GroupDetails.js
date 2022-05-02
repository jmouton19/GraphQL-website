import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AvatarPicker from './AvatarPicker';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNotify } from '../providers/NotificationProvider';
import { gql, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { stringToObject } from '../utils/utils';

function GroupDetails({ details }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [id, setID] = useState(null);

  const notify = useNotify();
  const client = useApolloClient();

  useEffect(() => {
    if (details) {
      setName(details.name);
      setDescription(details.description);
      setAvatarUrl(details.avatarUrl);
      setID(details.id);
    }
  }, []);

  const createGroup = () => {
    //TODO: Use actual date
    client
      .mutate({
        mutation: gql`
	  mutation{
		addGroup(input:{
			name: "${name}"
			description: "${description}"
			avatar:"${avatarUrl}"
			dateCreated: "2022-02-03"
		})
	}
	`,
      })
      .then((result) => {
        if (result.data.addGroup === 'true') {
          notify('success', 'Group has been created.');
          setOpenDialog(false);
          navigate('/groups');
        } else {
          notify('error', 'Unable to create group.');
        }
      });
  };

  
  const deleteGroup = () => {
    console.log("here")
    client
      .mutate({
        mutation: gql`
            mutation {
              deleteGroup(groupId:${id})
            }
        `,
      })
      .then((result) => {
        const groupDeleted = stringToObject(result.data.deleteGroup);
        if (groupDeleted.success === 'true') {
          notify('success', `${groupDeleted.message}`);
          navigate('/groups');
        } else {
          notify('error', groupDeleted.message);
        }
      });
  };

  return (
    <>
      {details ? (
        <IconButton color="primary" onClick={() => setOpenDialog(true)}>
          <SettingsIcon fontSize="large" />
        </IconButton>
      ) : (
        <Paper>
          <Stack justifyContent="space-around">
            <IconButton
              style={{ borderRadius: 0 }}
              onClick={() => setOpenDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Paper>
      )}

      <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
        <DialogTitle color="primary">
          {details ? 'Edit Group Details' : 'Create Group'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <DialogContentText>
              {details
                ? 'Please edit your group details.'
                : 'Please enter your group details here.'}
            </DialogContentText>

            <FormControl fullWidth>
              <InputLabel>Group Name</InputLabel>
              <OutlinedInput
                label="Group Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Group Description</InputLabel>
              <OutlinedInput
                label="Group Description"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
              />
            </FormControl>
            <DialogContentText>Pick your group avatar.</DialogContentText>
            <AvatarPicker setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack padding={1} spacing={1} direction="row">
            {details && (
              <IconButton color="error"
                onClick={() => {
									deleteGroup()
										.then(() => {
											notify('success',"Group successfully deleted.");
											//setTimeout(() => navigate("/"), 200);
										})            
                  .catch((err) => notify('error', "Unable to delete group."));
								}}
                >
                <DeleteIcon />
              </IconButton>
            )}
            <Button variant="outlined" onClick={createGroup}>
              {details ? 'Save Details' : 'Create Group'}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GroupDetails;
