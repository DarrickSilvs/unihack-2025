const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const locations = {};

app.post("/update-location", (req, res) => {
    const { userId, latitude, longitude } = req.body;

    if (!locations[userId]) {
        locations[userId] = [];
    }
    locations[userId].push({ latitude, longitude, timestamp: Date.now() });

    console.log(`Received location update for user ${userId}:`, { latitude, longitude });
    res.status(200).send("Location update received.");
});

app.get("/get-location/:userId", (req, res) => {
    const { userId } = req.params;

    if (locations[userId] && locations[userId].length > 0) {
        const latestLocation = locations[userId][locations[userId].length - 1];
        res.status(200).json(latestLocation);
    } else {
        res.status(404).send("Location not found.");
    }
});

app.listen(5173, () => {
    console.log("Server is running on http://localhost:5173");
});