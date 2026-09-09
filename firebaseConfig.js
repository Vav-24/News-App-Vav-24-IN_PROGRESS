// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC8Avdsio7Zqc-sRKg6BMziRkO1lMu4Tio",
//   authDomain: "news-app-b8476.firebaseapp.com",
//   projectId: "news-app-b8476",
//   storageBucket: "news-app-b8476.firebasestorage.app",
//   messagingSenderId: "37792800895",
//   appId: "1:37792800895:web:484c18882a0a5583a45f4a",
//   measurementId: "G-LRJB9EQ34F"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC8Avdsio7Zqc-sRKg6BMziRkO1lMu4Tio",
  authDomain: "news-app-b8476.firebaseapp.com",
  projectId: "news-app-b8476",
  storageBucket: "news-app-b8476.firebasestorage.app",
  messagingSenderId: "37792800895",
  appId: "1:37792800895:web:484c18882a0a5583a45f4a",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);