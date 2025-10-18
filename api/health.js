import { connectToDatabase } from './_lib/db.js';

export default async function handler(req, res) {
  try {
    let database = 'Disconnected';
    try {
      const { db } = await connectToDatabase();
      // Quick ping by listing collections name only to avoid heavy ops
      await db.listCollections({}, { nameOnly: true }).toArray();
      database = 'Connected';
    } catch (e) {
      database = 'Disconnected';
    }
    return res.status(200).json({ status: 'Server is running', database });
  } catch (err) {
    return res.status(500).json({ status: 'Error', database: 'Unknown' });
  }
}
