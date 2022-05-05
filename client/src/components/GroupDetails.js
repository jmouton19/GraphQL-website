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
import { useTranslation } from 'react-i18next';

function GroupDetails({ details }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  const notify = useNotify();
  const client = useApolloClient();

  useEffect(() => {
    if (details) {
      setName(details.name);
      setDescription(details.description);
      setAvatarUrl(details.avatar);
    }
  }, [details]);

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

  const editGroup = () => {
    client
      .mutate({
        mutation: gql`
        mutation {
          updateGroup(input: { 
              groupId:${details.id},
              description: "${description}",
              name: "${name}",
              avatar:"${avatarUrl}"
              }) {
              success
              message
        }
      }
      `,
      })
      .then((result) => {
        if (result.data.updateGroup.success) {
          notify('success', result.data.updateGroup.message);
          setOpenDialog(false);
          navigate(`/group/${details.id}`);
        } else {
          notify('error', result.data.updateGroup.message);
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
          {details ? t('editGroup.label') : t('createGroup.label')}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <DialogContentText>
              {details
                ? t('editGroupDetails.label')
                : t('enterGroupDetails.label')}
            </DialogContentText>

            <FormControl fullWidth>
              <InputLabel>{t('groupName.label')}</InputLabel>
              <OutlinedInput
                label={t('groupName.label')}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>{t('groupDescription.label')}</InputLabel>
              <OutlinedInput
                label={t('groupDescription.label')}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
              />
            </FormControl>
            <DialogContentText>{t('pickAvatar.label')}</DialogContentText>
            <AvatarPicker setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack padding={1} spacing={1} direction="row">
            {details && (
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            )}
            {details ? (
              <Button variant="outlined" onClick={editGroup}>{t('saveDetails.label')}</Button>
            ) : (
              <Button variant="outlined" onClick={createGroup}>
                {t('createGroup.label')}
              </Button>
            )}
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GroupDetails;
