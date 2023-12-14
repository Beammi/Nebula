import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User not found' });
  } else {
    // Handle other methods or return error
    res.status(405).end();
  }
}
