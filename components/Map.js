import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "500px",
    height: "500px",
};

const center = {
    lat: 0,
    lng: 0,
};

function Map({ location }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API,
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