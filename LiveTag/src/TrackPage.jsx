import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "supabaseClient";

function TrackPage() {
    const { id } = useParams();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const channel = supabase
            .channel(`realtime-location-${id}`)
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "locations", filter: `track_id=eq.${id}` }, (payload) => {
                setLocation({ lat: payload.new.latitude, lng: payload.new.longitude });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [id]);

    return (
        <div>
            {location ? (
                <p>Live Location: {location.lat}, {location.lng}</p>
            ) : (
                <p>Waiting for updates...</p>
            )}
        </div>
    );
}

export default TrackPage;