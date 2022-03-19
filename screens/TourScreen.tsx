import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Button, Linking } from 'react-native';

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
            <View style={styles.btn}>
              <Button
                title={'Tickets'}
                onPress={() => {
                  Linking.openURL(
                    'https://www.ticketmaster.com/porter-robinson-tickets/artist/1610529'
                  );
                }}></Button>
            </View>
            <View
              style={styles.separator2}
              lightColor='#ddd'
              darkColor='#333'
            />
            <Text style={styles.text1}>{item.date}</Text>
            <Text style={styles.text2}>{item.location}</Text>
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
  separator2: {
    marginVertical: 2,
    height: 1,
    width: '100%',
  },
  card: {
    marginVertical: 5,
    minHeight: 100,
    padding: 10,
    flex: 0.3,
    flexDirection: 'column',
    backgroundColor: '#ddd',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  btn: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text1: {
    color: '#67788a',
    fontSize: 16,
  },
  text2: {
    color: '#67788a',
    fontSize: 14,
  },
  scrollview: {
    width: '100%',
  },
});
