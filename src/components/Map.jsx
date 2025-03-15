import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "400px",
};

const center = {
    lat: 0,
    lng: 0,
};

function Map({ location }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "",
    });

    if (loadError) return <p>Error loading maps</p>;
    if (!isLoaded) return <p>Loading Maps...</p>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={{ lat: location.latitude, lng: location.longitude }}
        >
            <Marker position={{ lat: location.latitude, lng: location.longitude }} />
        </GoogleMap>
    );
}

export default Map;