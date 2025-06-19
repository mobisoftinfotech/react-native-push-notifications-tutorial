import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import requestUserPermission, { getFCMToken } from './src/service/fcmService';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    getFCMToken();

    messaging()
      .getInitialNotification()
      .then(remoteMsg => {
        if (remoteMsg)
          console.log(remoteMsg);
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        How to integrate and test Push Notifications in RN App
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 },
  title: { fontSize: 16, fontWeight: 'bold', paddingTop: 10, alignContent: 'center' },
});