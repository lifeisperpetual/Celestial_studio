import { connectToDatabase } from './_lib/db.js';

export default async function handler(req, res) {
  const verbose = process.env.VERBOSE_HEALTH === 'true';
  try {
    try {
      const { db } = await connectToDatabase();
      // lightweight connectivity test
      await db.command({ ping: 1 });
      return res.status(200).json({ status: 'Server is running', database: 'Connected' });
    } catch (e) {
      if (verbose) {
        console.error('Health DB connect error:', e);
        return res.status(500).json({
          status: 'Server is running',
          database: 'Disconnected',
          error: {
            name: e?.name,
            code: e?.code,
            message: e?.message,
          },
        });
      }
      return res.status(500).json({ status: 'Server is running', database: 'Disconnected' });
    }
  } catch (err) {
    if (verbose) console.error('Health handler error:', err);
    return res.status(500).json({ status: 'Error', database: 'Unknown' });
  }
}
