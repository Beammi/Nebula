// pages/api/nebuPosts.js
import getNebuFromGeoSpatial from './getNebuFromGeoSpatial';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { lat, lon, radius } = req.query;
    
    // Validate the latitude and longitude are provided and are numbers
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'Bad request. Latitude and longitude are required and must be numbers.' });
    }

    try {
      const posts = await getNebuFromGeoSpatial(parseFloat(lat), parseFloat(lon), radius ? parseInt(radius) : undefined);
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
