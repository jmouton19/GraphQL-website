import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const SuccessNotificationContext = createContext();
const ErrorNotificationContext = createContext();

export function useNotifySuccess() {
	return useContext(SuccessNotificationContext);
}

export function useNotifyError() {
	return useContext(ErrorNotificationContext);
}

function NotificationProvider({ children }) {
	const [open, setOpen] = React.useState(false);
	const [severity, setSeverity] = useState("success");
	const [message, setMessage] = useState("");

	function notifySuccess(msg) {
		setMessage(msg);
		setSeverity("success");
		setOpen(true);
	}

	function notifyError(msg) {
		setMessage(msg);
		setSeverity("error");
		setOpen(true);
	}

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<SuccessNotificationContext.Provider value={notifySuccess}>
			<ErrorNotificationContext.Provider value={notifyError}>
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
			</ErrorNotificationContext.Provider>
		</SuccessNotificationContext.Provider>
	);
}

export default NotificationProvider;
