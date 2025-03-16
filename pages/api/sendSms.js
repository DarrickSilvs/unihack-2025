import axios from 'axios';

const appName = "Live_Tag";
const apiKey = process.env.SMS_API_KEY;
const url = process.env.SMS_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userName, contactPhone, contactName, trackingLink } = req.body;

  try {
    const smsData = {
      messages: [
        {
          to: contactPhone,
          body: `Hello ${contactName}, this is ${userName} I am currently in danger. Please open this link for my current live location: ${trackingLink}`,
        },
      ],
    };

    const response = await axios.post(url, smsData, {
      auth: {
        username: appName,
        password: apiKey,
      },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Failed to send SMS:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
}