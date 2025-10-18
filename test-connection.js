import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Celestial:HSTPAS2FJ65RV82EFJZa%40@cluster0.fwnak5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected successfully!');
    await client.close();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
