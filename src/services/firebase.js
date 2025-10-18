// Optional Firebase Auth setup. To enable:
// 1) Install: npm i firebase
// 2) Create .env from .env.example with your Firebase keys
// 3) Uncomment the code below and use getAuth() in your components

// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();

// export async function signInWithGoogle() {
//   await signInWithPopup(auth, provider);
// }
// export async function logout() {
//   await signOut(auth);
// }
