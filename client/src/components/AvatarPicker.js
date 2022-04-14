import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";
import { Input } from "@mui/material";
import axios from "axios";

const convertToBase64 = (f) => {
	// source https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(f);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

function AvatarPicker(props) {
	const [imagePath, setImagePath] = useState(null);

	const { hideAvatar } = props;

	function uploadAndGetLink(fileBase64) {
		const urlWithQueryParameters =
			"https://api.imgbb.com/1/upload?key=f9f798ffd37ff7b7e88e47ac0dace3d0";

		const formdata = new FormData();

		formdata.append("image", fileBase64);

		const config = {
			headers: { "content-type": "multipart/form-data" },
		};

		axios.post(urlWithQueryParameters, formdata, config).then((res) => {
			const urlFromImgbb = res.data.data.url;
			props.setAvatarUrl(urlFromImgbb);
		});
	}

	return (
		<Stack direction="row" spacing={2}>
			{hideAvatar ? null : <Avatar src={imagePath} />}
			<Input
				type="file"
				inputProps={{ accept: "image/*" }}
				onChange={(event) => {
					setImagePath(URL.createObjectURL(event.target.files[0]));
					convertToBase64(event.target.files[0]).then((res) => {
						// remove bookkeeping part of encoding
						const fileBase64 = res.substr(res.indexOf("base64,") + 7);

						uploadAndGetLink(fileBase64);
					});
				}}
			/>
		</Stack>
	);
}

export default AvatarPicker;
