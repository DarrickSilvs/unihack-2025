import { use, useEffect, useState } from "react";
import { generateTrackingLink } from "./utils/generateLink";
import { registerUser } from "./utils/registerUser";
import { sendEmergencyMessage } from "./utils/sendMessage";

function App() {
    const [userName, setUserName] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [trackingLink, setTrackingLink] = useState(null);
    let trackId;

    useEffect(() => {
        createUser();
    },[]);

    async function createUser() {
        trackId = await registerUser(userName);
        if (!trackId) {
            return;
        }
    }

    async function handleGenerateLink() {
        const link = await generateTrackingLink(trackId);
        if (link) {
            setTrackingLink(link);
        }

        const sendHelp = await sendMessage(trackingLink);
        if (!sendHelp) {
            return;
        }
    }

    async function saveEmergencyContact() {
        const { data, error } = await supabase
            .from("emergency_contacts")
            .insert([{ user_id: trackId, name: contactName, phone: contactPhone }]);
        if (error) {
            console.error("Error saving emergency contact", error);
            return;
        }
        console.log("Emergency contact saved", data);
    }

    return (
        <div>
            createUser();
            <h1>LiveTag - Emergency Location Sharing</h1>
            <button onClick={handleGenerateLink}>Generate Tracking Link</button>
            {trackingLink && <p>Share this link: <a href={trackingLink}>{trackingLink}</a></p>}

            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Emergency contact name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Emergency contact phone number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
            />

            <button onClick={saveEmergencyContact}>Save Emergency Contact</button>
        </div>
    );
}

export default App;