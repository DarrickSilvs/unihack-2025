export default function handler(req, res) {
  const apiKey = process.env.GOOGLE_API;

  if (!apiKey) {
    return res.status(500).json({ error: "Google Maps API key is missing" });
  }

  res.status(200).json({ apiKey });
}