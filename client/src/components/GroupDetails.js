import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  Grid,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogContent,
  TextField,
  DialogContentText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AvatarPicker from './AvatarPicker';

function GroupDetails({ edit, details }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  return (
    <>
      {edit ? (
        <></>
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
          {edit ? 'Edit Group Details' : 'Create Group'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <DialogContentText>
              {edit
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
            <AvatarPicker setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)} />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GroupDetails;
