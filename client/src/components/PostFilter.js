import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  FormControlLabel,
  Slider,
  Switch,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PostFilter() {
  const [radius, setRadius] = React.useState(30);
  const [applyFilter, setApplyFilter] = useState(false);
  const handleChange = (event, newValue) => {
    setRadius(newValue);
  };
  return (
    <>
      <Container maxWidth="sm">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FormControlLabel
              value={applyFilter}
              control={<Switch />}
              label="Filter Posts"
              labelPlacement="start"
              onChange={() => setApplyFilter(!applyFilter)}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <Typography>{`Radius: ${radius}`}</Typography>
              <Slider value={radius} onChange={handleChange} />
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}
