import fs from 'fs';
import path from 'path';

const locationsFilePath = path.resolve('./lib/locations.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, latitude, longitude } = req.body;
    if (!userId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const now = new Date();
    const formattedTime = now.toTimeString().split(' ')[0];

    const locationData = { latitude, longitude, formattedTime };

    // Read existing locations
    const locations = JSON.parse(fs.readFileSync(locationsFilePath, 'utf8'));

    // Update location for the user
    locations[userId] = locationData;

    // Write updated locations back to the file
    fs.writeFileSync(locationsFilePath, JSON.stringify(locations, null, 2));

    console.log(`Received location update for user ${userId}:`, locationData);

    return res.status(200).json({ message: 'Location update received.' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}