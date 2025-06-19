import messaging, { type FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

async function requestUserPermission(): Promise<void> {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function getFCMToken(): Promise<void> {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
  } else {
    console.log('Failed', 'No token received');
  }
}

// Foreground Notifications: When the application is opened and in view.
messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  Alert.alert('A new FCM Message arrived!!!', JSON.stringify(remoteMessage));
});

// Background Notifications: When the application is open, however in the background (minimised).
messaging().setBackgroundMessageHandler(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  console.log('Message handled in the background!!!', remoteMessage);
});

export default requestUserPermission;