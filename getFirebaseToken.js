require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = 'yekta@codeway.init';
const password = 'test123';

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    userCredential.user.getIdToken().then((token) => {
      console.log('Firebase ID Token:', token);
    });
  })
  .catch((error) => {
    console.error('Error signing in:', error);
  });
