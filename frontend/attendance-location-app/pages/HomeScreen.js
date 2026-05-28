import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import * as Location
  from 'expo-location';

import MapView, {
  Marker
} from 'react-native-maps';

import axios from 'axios';

import {
  API_URLS
} from '../config';

export default function HomeScreen() {

  const [location,
    setLocation] =
    useState(null);

  const [marker,
    setMarker] =
    useState(null);

  const [status,
    setStatus] =
    useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  async function getCurrentLocation() {

    const { status } =
      await Location
        .requestForegroundPermissionsAsync();

    if (
      status !== 'granted'
    ) {

      Alert.alert(
        'Izin lokasi ditolak'
      );

      return;
    }

    const currentLocation =
      await Location
        .getCurrentPositionAsync({});

    const coords = {

      latitude:
        currentLocation
          .coords
          .latitude,

      longitude:
        currentLocation
          .coords
          .longitude,
    };

    setLocation(coords);
    setMarker(coords);
  }

  async function checkLocation() {

    try {

      const response =
        await axios.post(
          API_URLS.locate,
          {
            lat:
              marker.latitude,

            lng:
              marker.longitude,
          }
        );

      setStatus(
        response.data
      );

      Alert.alert(
        'Status Lokasi',
        response.data
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'Gagal koneksi API'
      );
    }
  }

  if (!location) {

    return (
      <View
        style={
          styles.center
        }
      >
        <Text>
          Mengambil lokasi...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={
        styles.container
      }
    >

      <MapView
        style={
          styles.map
        }
        initialRegion={{
          latitude:
            location.latitude,

          longitude:
            location.longitude,

          latitudeDelta:
            0.005,

          longitudeDelta:
            0.005,
        }}
      >

        <Marker
          coordinate={
            marker
          }
          draggable
          onDragEnd={(e) =>
            setMarker(
              e.nativeEvent
                .coordinate
            )
          }
        />

      </MapView>

      <View
        style={
          styles.bottomCard
        }
      >

        <Text
          style={
            styles.title
          }
        >
          Validasi Lokasi
        </Text>

        <Text>
          Latitude:
          {' '}
          {
            marker.latitude
          }
        </Text>

        <Text>
          Longitude:
          {' '}
          {
            marker.longitude
          }
        </Text>

        <Text
          style={
            styles.status
          }
        >
          Status:
          {' '}
          {status}
        </Text>

        <TouchableOpacity
          style={
            styles.button
          }
          onPress={
            checkLocation
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Check Location
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
    },

    center: {
      flex: 1,
      justifyContent:
        'center',
      alignItems:
        'center',
    },

    map: {
      flex: 1,
    },

    bottomCard: {
      backgroundColor:
        '#fff',

      padding: 20,
    },

    title: {
      fontSize: 22,
      fontWeight:
        'bold',

      marginBottom: 10,
    },

    status: {
      marginVertical: 10,
      fontWeight:
        'bold',
      color:
        '#2563eb',
    },

    button: {
      backgroundColor:
        '#2563eb',

      padding: 15,

      borderRadius: 10,

      alignItems:
        'center',
    },

    buttonText: {
      color: '#fff',
      fontWeight:
        'bold',
    },
  });