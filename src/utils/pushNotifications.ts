// Example: Push notification registration using the Web Push API
export async function registerPush() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const reg = await navigator.serviceWorker.ready;
    // Replace with your VAPID public key
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey
    });
    // Send subscription to your backend
    return subscription;
  }
  throw new Error('Push notifications not supported');
}
