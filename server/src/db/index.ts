import mongoose, { Connection } from 'mongoose';

const mongooseConnect = async (dbUri: string): Promise<void> => {
  await mongoose.connect(dbUri);

  const db = mongoose.connection as Connection;

  db.once('open', async () => {
    console.log('Connected to database');
  });

  db.on('error', () => {
    console.log('Error connecting to database');
  });

  db.on('error', () => {
    console.log('Disconnected from database');
  });
};

export default mongooseConnect;
