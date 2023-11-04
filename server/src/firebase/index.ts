import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './fireServiceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://buyemall-default-rtdb.firebaseio.com',
});

export default admin;
