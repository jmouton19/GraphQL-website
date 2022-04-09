import { useMap } from 'react-leaflet';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom, { duration: 1 });
  return null;
}
export default ChangeView;
