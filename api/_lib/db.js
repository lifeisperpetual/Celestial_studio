import { MongoClient } from 'mongodb';

const uri = process.env.ATLAS_URI;
if (!uri) {
  throw new Error('ATLAS_URI is not set. Define it in Vercel Project Settings → Environment Variables.');
}

let cached = globalThis._mongo;
if (!cached) {
  cached = globalThis._mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
    cached.promise = client.connect().then((client) => ({
      client,
      db: client.db('CS'),
    }));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
