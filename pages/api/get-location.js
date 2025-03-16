import fs from 'fs';
import path from 'path';

const locationsFilePath = path.resolve('./lib/locations.json');

export default function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    const locations = JSON.parse(fs.readFileSync(locationsFilePath, 'utf8'));

    const locationData = locations[userId];

    if (locationData) {
      console.log(`Retrieved location for user ${userId}:`, locationData);
      return res.status(200).json(locationData);
    } else {
      return res.status(404).json({ error: 'Location not found.' });
    }
  } catch (error) {
    console.error('Error reading locations file:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}