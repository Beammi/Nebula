// pages/api/auth/register.js
import { hashPassword, verifyPassword } from '../../../lib/auth';
import db from "../../../lib/db"

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  if (!email || !email.includes('@')) {
  res.status(422).json({ message: 'Invalid email.' });
  return;
  }
  
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  
  if (rows.length === 0) {
  res.status(401).json({ message: 'No user found with this email.' });
  return;
  }
  
  const user = rows[0];
  const isValid = await verifyPassword(password, user.hashed_password);
  
  // if (!isValid) {
  // res.status(401).json({ message: 'Incorrect password.' });
  // return;
  // }
  
  // Implement session creation or token generation logic here
  // For example, you can generate a JWT token or use any other method for session management
  
  res.status(200).json({ message: 'Logged in successfully.' });
  }
  
  export default handler;