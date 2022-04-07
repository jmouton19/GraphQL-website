import React from 'react';
import { useMap } from 'react-leaflet';
import { Fab } from '@mui/material';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom, { duration: 1 });
  return (
    <>
      <Fab
        style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }}
        color="primary"
        aria-label="edit"
        onClick={() => map.flyTo(center, zoom, { duration: 1 })}
      >
        <CenterFocusStrongIcon />
      </Fab>
    </>
  );
}
export default ChangeView;
