import db from "../../../lib/db"

export default async function handler(req, res) {
    // Ensure we're dealing with a GET request
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { email, provider } = req.query;
  
    if (!email || !provider) {
      return res.status(400).json({ message: 'Email and provider are required' });
    }
  
    try {
      // Query the database for a user profile matching the email and provider
      const query = `
        SELECT * FROM users
        WHERE email = $1 AND provider = $2;
      `;
      const values = [email, provider];
  
      const { rows } = await db.query(query, values);
  
      if (rows.length > 0) {
        // Send back the first matching user profile
        res.status(200).json(rows[0]);
      } else {
        // No user found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }