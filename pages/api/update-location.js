// pages/api/update-location.js
import { locations } from "../../lib/locations";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { userId, latitude, longitude } = req.body;
    if (!userId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    if (!locations[userId]) {
      locations[userId] = [];
    }

    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0];

    locations[userId].push({ latitude, longitude, timestamp: formattedTime });
    console.log(`Received location update for user ${userId}:`, { latitude, longitude, formattedTime });

    return res.status(200).json({ message: "Location update received." });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
