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

function GroupDetails({ details }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (details) {
      setName(details.name);
      setDescription(details.description);
      setAvatarUrl(details.avatarUrl);
    }
  }, []);

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
              <IconButton color='error'>
                <DeleteIcon/>
              </IconButton>
            )}
            <Button variant="outlined">
              {details ? 'Save Details' : 'Create Group'}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GroupDetails;
