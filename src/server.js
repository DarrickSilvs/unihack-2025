import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const locations = {};

const link = import.meta.env.VITE_LINK

app.post("/api/update-location", (req, res) => {
    const { userId, latitude, longitude } = req.body;

    if (!locations[userId]) {
        locations[userId] = [];
    }

    const now = new Date();
    const formattedTime = now.toTimeString().split(' ')[0]; 

    locations[userId].push({ latitude, longitude, timestamp: formattedTime });

    console.log(`Received location update for user ${userId}:`, { latitude, longitude, formattedTime });
    res.status(200).send("Location update received.");
});

app.get("/api/get-location/:userId", (req, res) => {
    const { userId } = req.params;

    if (locations[userId] && locations[userId].length > 0) {
        const latestLocation = locations[userId][locations[userId].length - 1];
        res.status(200).json(latestLocation);
    } else {
        res.status(404).send("Location not found.");
    }
});