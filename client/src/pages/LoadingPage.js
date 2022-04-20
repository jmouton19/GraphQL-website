import { CircularProgress, Grid } from "@mui/material";

import React from "react";

function LoadingPage({ minHeight }) {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: minHeight ? minHeight : "90vh" }}
		>
			<CircularProgress />
		</Grid>
	);
}

export default LoadingPage;
