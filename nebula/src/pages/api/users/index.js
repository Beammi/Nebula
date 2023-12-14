import prisma from '../../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    console.log("Request Body:", req.body); // Add this line


    // Validate the input
    if (!name || !email) {
      return res.status(400).json({ error: 'Missing name or email' });
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle other HTTP methods or return an error
    res.status(405).end();
  }
}
