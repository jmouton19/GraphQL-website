import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function useNotify() {
  return useContext(NotificationContext);
}

function NotificationProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');

  function notify(type, msg) {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ maxWidth: 400 }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
