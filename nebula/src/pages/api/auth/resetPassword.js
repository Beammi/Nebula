// pages/api/auth/reset-password.js
import { hashPassword } from "../../../lib/auth";
import db from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, newPassword, provider } = req.body;
  if (provider !== "email") {
    res.status(400).json({ message: "Password reset is only available for email-based logins." });
    return;
  }
  if (!email || !email.includes("@")) {
    res.status(400).json({ message: "Please provide a valid email address." });
    return;
  }

  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (rows.length === 0) {
    // It's safer to use a generic message.
    res.status(200).json({ message: "If your email is registered, you will receive a password reset email." });
    return;
  }

  const hashedNewPassword = await hashPassword(newPassword);

  await db.query("UPDATE users SET hashed_password = $1 WHERE email = $2", [hashedNewPassword, email]);

  // Remember to implement some form of verification before this step.
  res.status(200).json({ message: "Your password has been reset successfully." });
}

export default handler;
