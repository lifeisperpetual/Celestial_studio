import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../_lib/db.js';
import { parseJsonBody } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = req.body && Object.keys(req.body).length ? req.body : await parseJsonBody(req);
    const { email, password } = body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'No account found with this email. Please sign up first.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
    }

    await usersCollection.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ success: false, message: 'Error signing in. Please try again.' });
  }
}
