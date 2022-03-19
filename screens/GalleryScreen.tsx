import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Image } from 'react-native';
import { Text, View } from '../components/Themed';
const win = Dimensions.get('window');
export default function GalleryScreen() {
  const photos = [
    'https://i.imgur.com/mrdzgiy.jpg',
    'https://i.imgur.com/Dpb0iCz.jpg',
    'https://i.imgur.com/OEPRCWW.png',
    'https://i.imgur.com/KQlxy9U.png',
    'https://i.imgur.com/WAoIORv.png',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Porter Robinson</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />

      {
        <ScrollView style={styles.gallery} showsVerticalScrollIndicator={false}>
          {photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.image} />
          ))}
        </ScrollView>
      }
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
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
  gallery: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  image: {
    backgroundColor: '#ddd',
    width: win.width,
    height: win.width / 1.6,
  },
});
