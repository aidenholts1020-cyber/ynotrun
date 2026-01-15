// Firebase Cloud Messaging Service Worker
// This file handles push notifications even when the app is closed

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyDNQtNS2I67kPOIRMVN2NB_qqY3X9lqf_k",
  authDomain: "ynotrun-7cd5c.firebaseapp.com",
  projectId: "ynotrun-7cd5c",
  storageBucket: "ynotrun-7cd5c.firebasestorage.app",
  messagingSenderId: "682603769946",
  appId: "1:682603769946:web:6ea4a821df1380e65d6863"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title || 'Y NOT RUN';
  const notificationOptions = {
    body: payload.notification.body || 'Why aren\'t you working out?',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    tag: 'ynotrun-notification',
    requireInteraction: true,
    data: payload.data
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  event.notification.close();

  // Open the app when notification is clicked
  event.waitUntil(
    clients.openWindow('https://ynotrun.vercel.app/')
  );
});
