import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

export default function App() {
  const [photo, setPhoto] = useState(null);

  const handleCapture = async () => {
    launchCamera({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel || response.errorCode) {
        Alert.alert('Error', 'Gagal mengambil gambar');
        return;
      }

      const { uri, fileName } = response.assets[0];

      // Ambil lokasi
      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;

          const uploadUri = uri;
          const storageRef = storage().ref(`photos/${fileName}`);
          
          await storageRef.putFile(uploadUri);
          const downloadURL = await storageRef.getDownloadURL();

          // Simpan ke Firestore
          await firestore().collection('photos').add({
            photo_url: downloadURL,
            latitude,
            longitude,
            timestamp: firestore.FieldValue.serverTimestamp(),
          });

          setPhoto(downloadURL);
          Alert.alert('Berhasil', 'Gambar dan lokasi disimpan.');
        },
        error => {
          Alert.alert('Lokasi Error', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000 }
      );
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Ambil Gambar" onPress={handleCapture} />
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200, marginTop: 20 }} />}
    </View>
  );
}

// import { StatusBar } from 'expo-status-bar';
// import { Platform, StyleSheet, Text, View } from 'react-native';
// // import { app, storage } from './firebaseConfig';
// // import { getFirestore, collection, addDoc } from 'firebase/firestore';

// export default function App() {
//   // const db = getFirestore(app)

//   const addData = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "users"), {
//         first: "Raditya",
//         last: "Herkristito",
//         born: "2002",
//       });
//       if (Platform.OS === "android") {
//         console.log("Document written from phone with ID: ", docRef.id);
//       } else {
//         console.log("Document written with ID: ", docRef.id);
//       }
//     } catch (err) {
//       console.error("Error occured ", err);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
