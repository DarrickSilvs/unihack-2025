import { use, useEffect, useState } from "react";
import { generateTrackingLink } from "./utils/generateLink";
import { sendMessage } from "./utils/sendMessage";
import "./styles.css"; // We import the global styles.
import logo from "./assets/livetag-logo.png";

function App() {
    const [userName, setUserName] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [trackingLink, setTrackingLink] = useState(null);
    const [showLocationPage, setShowLocationPage] = useState(false);

    async function handleGenerateLink() {
        const link = await generateTrackingLink(userName);
        if (link) {
            setTrackingLink(link);
        }

        const sendHelp = await sendMessage(userName, contactName, contactPhone, trackingLink);
        if (!sendHelp) {
            return;
        }

        setShowLocationPage(true); // We navigate to the Live Location Page.
    }

    return (
        <div className="container">
            {!showLocationPage ? (
                <div className="form-container">
                    {/* Live Tag Logo */}
                    <img src={logo} alt="Live Tag Logo" className="logo" />

                    <h1>LiveTag - Emergency Location Sharing</h1>
                    <div className="input-box">
                        <label>👤 User Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <label>👤 Contact Name</label>
                        <input
                            type="text"
                            placeholder="Emergency contact name"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <label>📞 Contact Phone Number</label>
                        <input
                            type="text"
                            placeholder="Emergency contact phone number"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                        />
                    </div>

                    <button
                        className="save-btn"
                        onClick={handleGenerateLink}>
                        Generate Tracking Link
                    </button>

                    {trackingLink && (
                        <p>
                            Share this link: <a href={trackingLink}>{trackingLink}</a>
                        </p>
                    )}

                    {/* Get Help Button */}
                    <button className="help-btn">🚨 GET HELP</button>
                </div>
            ) : (
                <div className="location-container">
                    <h1>Live Location</h1>
                    <iframe
                        title="Live Location Map"
                        width="100%"
                        height="400px"
                        style={{ border: 0, borderRadius: "10px"}}
                        loading="lazy"
                        allowFullScreen
                        src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API&q=Sydney,Australia"
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default App;