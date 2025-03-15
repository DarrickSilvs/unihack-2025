import { use, useEffect, useState } from "react";
import { generateTrackingLink } from "./utils/generateLink";
import { sendEmergencyMessage } from "./utils/sendMessage";

function App() {
    const [userName, setUserName] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [trackingLink, setTrackingLink] = useState(null);

    async function handleGenerateLink() {
        const link = await generateTrackingLink(userName);
        if (link) {
            setTrackingLink(link);
        }

        const sendHelp = await sendMessage(userName, contactName, contactPhone, trackingLink);
        if (!sendHelp) {
            return;
        }
    }

    return (
        <div>
            <h1>LiveTag - Emergency Location Sharing</h1>
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

            <button onClick={handleGenerateLink}>Generate Tracking Link</button>
            {trackingLink && <p>Share this link: <a href={trackingLink}>{trackingLink}</a></p>}
        </div>
    );
}

export default App;