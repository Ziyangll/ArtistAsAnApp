import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TourScreen() {
  const [listOfTourDates, setListOfTourDates] = useState([
    {
      id: '1',
      date: 'Loading...',
      location: 'Loading...',
    },
  ]);
  // here we fetch the data from firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://porterrobinsontourdates-default-rtdb.firebaseio.com/tourDates.json'
        );
        if (!res.ok) {
          console.log('firebase connection success but returned an error');
        }
        const data = await res.json();
        const newTourDates = [];
        for (const key in data) {
          newTourDates.push({
            id: key,
            date: data[key].date,
            location: data[key].location,
          });
        }
        setListOfTourDates(newTourDates);
        console.log('connection worked', `${JSON.stringify(newTourDates)}`);
      } catch ({ message }) {
        console.log('connection failed', `${message}`);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Porter Robinson</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}>
        {listOfTourDates.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Location: {item.location}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  card: {
    marginVertical: 5,
    minHeight: 100,
    padding: 10,
    flex: 0.3,
    backgroundColor: '#ddd',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    color: '#444',
  },
  scrollview: {
    width: '80%',
  },
});
