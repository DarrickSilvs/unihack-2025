import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

function Map({ location }) {
  const [apiKey, setApiKey] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch("/api/loadGoogleMaps");
        if (!response.ok) throw new Error("Failed to load Google Maps API key");
        const { apiKey } = await response.json();
        console.log("Fetched API key:", apiKey);
        setApiKey(apiKey);
      } catch (error) {
        console.error("Error fetching API key:", error.message);
        setLoadError(error.message);
      }
    };

    fetchApiKey();
  }, []);

  const { isLoaded, loadError: scriptLoadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  if (loadError || scriptLoadError) return <p>Error loading maps: {loadError || scriptLoadError.message}</p>;
  if (!isLoaded) return <p>Loading Maps...</p>;
  if (!location) return <p>No location data available.</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={{ lat: location.latitude, lng: location.longitude }}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker position={{ lat: location.latitude, lng: location.longitude }} />
    </GoogleMap>
  );
}

export default Map;