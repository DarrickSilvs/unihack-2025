import "./styles.css";
import logo from "./assets/livetag-logo.png";
import { useEffect, useState } from "react";
import { sendMessage } from "./utils/sendMessage";

function App() {
    const [userName, setUserName] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [trackingLink, setTrackingLink] = useState(null);
    const [userId, setUserId] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [previousLocation, setPreviousLocation] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newLocation = { latitude, longitude };
                    setCurrentLocation(newLocation);
                },
                (error) => {

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.log("The request to get location timed out.");
                            break;
                        default:
                            console.log("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        if (userId) {
            const locationInterval = setInterval(() => {
                getLocation();
            }, 5000);

            return () => clearInterval(locationInterval);
        }
    }, [userId]);

    useEffect(() => {
        if (currentLocation && previousLocation) {
            const isSignificantChange = checkSignificantChange(currentLocation, previousLocation);
            if (isSignificantChange) {
                sendLocationUpdate(currentLocation);
                setPreviousLocation(currentLocation);
            }
        } else if (currentLocation) {
            sendLocationUpdate(currentLocation);
            setPreviousLocation(currentLocation);
        }
    }, [currentLocation]);

    const checkSignificantChange = (current, previous) => {
        const latChange = Math.abs(current.latitude - previous.latitude);
        const lonChange = Math.abs(current.longitude - previous.longitude);
        const threshold = 0.01;
        return latChange > threshold || lonChange > threshold;
    };

    const sendLocationUpdate = async (location) => {
        if (!userId) return;

        try {
            const response = await fetch("http://localhost:3000/update-location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    latitude: location.latitude,
                    longitude: location.longitude,
                }),
            });

            if (response.ok) {
                console.log("Location update sent successfully.");
            } else {
                console.error("Failed to send location update.");
            }
        } catch (error) {
            console.error("Error sending location update:", error);
        }
    };

    async function handleGenerateLink() {
        const newUserId = 12345
        setUserId(newUserId);

        const newTrackingLink = `http://localhost:5173/track/${newUserId}`;
        setTrackingLink(newTrackingLink);

        /*
        const sendHelp = await sendMessage(userName, contactName, contactPhone, newTrackingLink);
        if (!sendHelp) {
            return;
        }
        */

        getLocation();
    }

    return (
        <div className="container">
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

                <button className="help-btn" onClick={handleGenerateLink}>🚨 GET HELP</button>

                {trackingLink && (
                    <p>
                        Share this link: <a href={trackingLink}>{trackingLink}</a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;