import { useMap } from 'react-leaflet';

function ChangeView({ center }) {
  const map = useMap();
  map.flyTo(center, map.getZoom(), { duration: 1 });
  return null;
}
export default ChangeView;
