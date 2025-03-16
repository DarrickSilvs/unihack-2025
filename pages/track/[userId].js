import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function Track() {
  const router = useRouter();
  const { userId } = router.query;
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !userId) return;

    const fetchLocation = async () => {
        try {
          const response = await fetch(`/api/get-location?userId=${userId}`);
          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || "Failed to fetch location");
          }
          const data = await response.json();
          setLocation(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, [router.isReady, userId]);

  if (!router.isReady) return <p>Loading...</p>;
  if (isLoading) return <p>Loading location...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="location-container">
      <h1>Tracking Location</h1>
      <p>Last Updated: {location?.timestamp}</p>
      <Map location={location} />
    </div>
  );
}
