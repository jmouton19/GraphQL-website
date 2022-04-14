import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLink = styled(Link)`
	text-decoration: none;

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		color: inherit;
	}
`;

export default StyledLink;
