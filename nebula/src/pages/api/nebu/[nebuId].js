// pages/api/nebu/[nebuId].js
import getNebuById from './getNebuById'; // Adjust the import path as needed

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { nebuId } = req.query; // Extract nebuId from the query parameters
            const nebu = await getNebuById(nebuId);

            if (nebu) {
                res.status(200).json(nebu);
            } else {
                res.status(404).json({ message: 'Nebu not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
