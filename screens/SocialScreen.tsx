import { StyleSheet, Button, Linking } from 'react-native';
import { View, Text } from '../components/Themed';
export default function SocialScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Porter Robinson</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <Button
        title={'Website'}
        onPress={() => Linking.openURL('https://porterrobinson.com')}
      />
      <Button
        title={'Tickets'}
        onPress={() =>
          Linking.openURL(
            'https://www.ticketmaster.com/porter-robinson-tickets/artist/1610529'
          )
        }
      />
      <Button
        title={'Spotify'}
        onPress={() =>
          Linking.openURL(
            'https://open.spotify.com/artist/3dz0NnIZhtKKeXZxLOxCam'
          )
        }
      />
      <Button
        title={'Apple Music'}
        onPress={() =>
          Linking.openURL(
            'https://music.apple.com/us/artist/porter-robinson/282330711?ls=1&app=music&at=1l3vpUI&ct=0f7bgu'
          )
        }
      />
      <Button
        title={'Instagram'}
        onPress={() =>
          Linking.openURL('https://www.instagram.com/porterrobinson/')
        }
      />
      <Button
        title={'Youtube'}
        onPress={() =>
          Linking.openURL('https://www.youtube.com/PorterRobinson')
        }
      />
      <Button
        title={'Facebook'}
        onPress={() =>
          Linking.openURL('https://www.facebook.com/porterrobinsonmusic')
        }
      />
      <Button
        title={'Twitter'}
        onPress={() => Linking.openURL('https://twitter.com/porterrobinson')}
      />
      <Button
        title={'TikTok'}
        onPress={() =>
          Linking.openURL('https://www.tiktok.com/@porterrobinson?lang=en')
        }
      />
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
});
