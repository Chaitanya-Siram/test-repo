// // Firebase Cloud Messaging Configuration File.
// // Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// initializeApp(firebaseConfig);

// const messaging = getMessaging();

// export const requestForToken = () => {
//   return getToken(messaging, {
//     vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
//   })
//     .then((currentToken) => {
//       if (currentToken) {
//         localStorage.setItem('FCM-Token', currentToken);
//         console.log('current token for client: ', currentToken);
//         // Perform any other neccessary action with the token
//       } else {
//         // Show permission request UI
//         console.log(
//           'No registration token available. Request permission to generate one.'
//         );
//       }
//     })
//     .catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//     });
// };

// // Handle incoming messages. Called when:
// // - a message is received while the app has focus
// // - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });

// export const Sendrequest = () => {
//   console.log('Requesting User Permission……');

//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification User Permission Granted.');
//     } else {
//       console.log('User Permission Denied.');
//     }
//   });
// };
