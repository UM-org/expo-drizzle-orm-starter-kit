import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { SelectGift, gifts } from '@/db/schema';
import { db } from '@/db/client';

export default function GiftsScreen() {
  const [data, setData] = React.useState<SelectGift[]>([]);

  const fetchGifts = useCallback(async () => {
    const res = await db?.select().from(gifts);
    setData(res || [])
  }, [])

  useFocusEffect(() => {
    fetchGifts().then().catch(e => console.log(e))
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gifts</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
