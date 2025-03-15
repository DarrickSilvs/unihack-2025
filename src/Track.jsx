import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "./components/Map";

function Track() {
    const { userId } = useParams();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`http://localhost:5173/get-location/${userId}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch location: ${response.statusText}`);
                }

                const data = await response.json();

                if (!data || !data.latitude || !data.longitude) {
                    throw new Error("Invalid location data received from the server.");
                }

                setLocation(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching location:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocation();
        const interval = setInterval(fetchLocation, 5000);

        return () => clearInterval(interval);
    }, [userId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Tracking Location</h1>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <Map location={location} />
        </div>
    );
}

export default Track;