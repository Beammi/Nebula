// pages/api/auth/register.js
import { hashPassword } from '../../../lib/auth';
import db from "../../../lib/db"

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { email, password } = req.body;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({
      message: 'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }


  const { rows } = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  if (rows.length > 0) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  const hashedPassword = await hashPassword(password);
  let display_name = email.split("@")[0];
  await db.query(
    'INSERT INTO users (email, hashed_password,display_name) VALUES ($1, $2, $3)',
    [email, hashedPassword, display_name]
  );

  res.status(201).json({ message: 'Created user!' });
}

export default handler;
