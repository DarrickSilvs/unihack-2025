// pages/api/get-location.js
import { locations } from "../../lib/locations";

export default function handler(req, res) {
  const { userId } = req.query;
  if (locations[userId] && locations[userId].length > 0) {
    const latestLocation = locations[userId][locations[userId].length - 1];
    return res.status(200).json(latestLocation);
  } else {
    return res.status(404).json({ error: "Location not found." });
  }
}