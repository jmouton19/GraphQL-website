import {
	//Button,
	Dialog,
	//DialogActions,
	DialogTitle,
	//Divider,
	Fab,
	//FormControl,
	//FormHelperText,
	//Grid,
	//IconButton,
	//InputAdornment,
	//InputLabel,
	//OutlinedInput,
	//Stack,
	//TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
//import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const fabStyle = {
	margin: 0,
	top: "auto",
	right: 20,
	bottom: 20,
	left: "auto",
	position: "fixed",
};

function EditProfile() {
    const [edit, setEdit] = useState(false);

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
            </Dialog>
        </>
    );
}
export default EditProfile;