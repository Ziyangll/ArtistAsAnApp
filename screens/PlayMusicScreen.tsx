import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import AudioPlayer from '../components/Player';

const PorterRobinsonArtistID = '3dz0NnIZhtKKeXZxLOxCam';
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function PlayMusicScreen() {
  const [isDataHere, setIsDataHere] = useState(false);
  const [tracksData, setTracksData] = useState([]);
  const [token, setToken] = useState('');
  // playing music
  const [sound, setSound] = React.useState();
  async function playSound(preview_url: string) {
    try {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({ uri: preview_url });
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  // stopping the music
  const stopTheMusic = () => {
    sound.unloadAsync();
  };
  // connect to spotify api
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '0af87ec08532452d98daa09c0bea74bd',
      scopes: ['user-read-email'],
      // In order to follow the "Authorization Code Flow"
      // to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: 'exp://127.0.0.1:19000/',
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setToken(access_token);
    } else {
      console.log('have not login yet');
    }
  }, [response]);
  // get top tracks
  useEffect(() => {
    if (token) {
      fetch(
        `https://api.spotify.com/v1/artists/${PorterRobinsonArtistID}/top-tracks?market=US`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setIsDataHere(true);
          setTracksData(response.tracks);
        })
        .catch((error) => {
          console.log('spotify error', error.message);
        });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Porter Robinson</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      {!isDataHere ? (
        <Button
          title='Login with Spotify'
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Button title='STOP' onPress={stopTheMusic} />
          {tracksData.map((item) => (
            <AudioPlayer
              key={item.id}
              item={item}
              styles={styles}
              playSound={playSound}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'black',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: { width: 200, marginTop: 50 },
  card: {
    marginVertical: 5,
    minHeight: 100,
    padding: 10,
    width: '100%',
    flex: 0.3,
    backgroundColor: '#ddd',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  albumHeader: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
  },
  albumName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  player: {
    backgroundColor: 'transparent',
    color: '#333',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: 10,
  },
  playButton: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },
});
