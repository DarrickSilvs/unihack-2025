import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "./components/Map";

function Track() {
    const { userId } = useParams();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            const response = await fetch(`http://localhost:3000/get-location/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setLocation(data);
            }
        };

        fetchLocation();
        const interval = setInterval(fetchLocation, 5000);

        return () => clearInterval(interval);
    }, [userId]);

    if (!location) {
        return <p>Loading...</p>;
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