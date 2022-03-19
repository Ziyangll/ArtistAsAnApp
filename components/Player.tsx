import { View, Text } from './Themed';
import { Image, Button } from 'react-native';
import { useState } from 'react';
export default function AudioPlayer({ item, styles, playSound }) {
  return (
    <View key={item.id} style={styles.card}>
      <View style={styles.albumHeader}>
        <Image
          // we use the album.images[0].url to get the largest image they have
          source={{ uri: item.album.images[0].url }}
          style={styles.image}
        />
        <View style={styles.playButton}>
          <Button
            title='PLAY'
            onPress={() => {
              playSound(item.preview_url);
            }}
          />
        </View>
      </View>
      <Text style={styles.albumName}>{item.name}</Text>
    </View>
  );
}
