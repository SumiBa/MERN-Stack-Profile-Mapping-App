import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map({ address, name }) {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const successShown = useRef(false);

  useEffect(() => {
    if (!address) {
      setPosition(null);
      setError(null);
      successShown.current = false;
      return;
    }

    setLoading(true);
    setError(null);
    setPosition(null);
    successShown.current = false;

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);

          if (!successShown.current) {
            toast.success(`Location found for "${address}"`);
            successShown.current = true;
          }
        } else {
          throw new Error("Location not found");
        }
      } catch (err) {
        setError("Unable to locate address.");
        toast.error(`Error: ${err.message}`);
        console.error("Geocoding error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-white rounded shadow">
        {error} for "{address}"
      </div>
    );
  }

  if (!position) {
    return (
      <div className="text-gray-500 text-center p-4 bg-white rounded shadow">
        Enter an address to see the map.
      </div>
    );
  }

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{name || address}</Popup>
      </Marker>
    </MapContainer>
  );
}
