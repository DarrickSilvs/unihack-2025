import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function Track() {
  const router = useRouter();
  const { userId } = router.query;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let intervalId;

    if (userId) {
      const fetchLocation = async () => {
        const response = await fetch(`/api/get-location?userId=${userId}`);
        if (response.ok) {
          const locationData = await response.json();
          setLocation(locationData);
        } else {
          console.error("Location not found.");
        }
      };

      fetchLocation();
      intervalId = setInterval(fetchLocation, 5000);
    }

    return () => clearInterval(intervalId);
    }, [userId]);

    if (!router.isReady) return <p>Loading...</p>;

    return (
    <div className="location-container">
        <h1>Tracking Location</h1>
        <p>Last Updated: {location?.formattedTime}</p>
        <Map location={location} />
    </div>
  );
}