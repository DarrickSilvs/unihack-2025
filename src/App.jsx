import { useState } from "react";
import { generateTrackingLink } from "./utils/generateLink";
import supabase from "./supabaseClient";

function App() {
    const [trackingLink, setTrackingLink] = useState(null);

    async function handleGenerateLink() {

        const name = "John Doe";
        const { data, error } = await supabase
        .from("users")
        .insert([{ name: name}]);

        if (error) {
            console.error("Error inserting link into Supabase:", error);
            return null;
        }
    
        const link = await generateTrackingLink(data[0].id);
        if (link) {
            setTrackingLink(link);
        }
    }

    return (
        <div>
            <h1>LiveTag - Emergency Location Sharing</h1>
            <button onClick={handleGenerateLink}>Generate Tracking Link</button>
            {trackingLink && <p>Share this link: <a href={trackingLink}>{trackingLink}</a></p>}
        </div>
    );
}

export default App;