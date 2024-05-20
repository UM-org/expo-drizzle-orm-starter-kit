import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import usePrisma from '@/hooks/usePrisma';
import React, { useCallback } from 'react';
import { Gift } from '@prisma/client';

export default function GiftsScreen() {
  const { prisma } = usePrisma();
  const [gifts, setGifts] = React.useState<Gift[]>([]);

  const fetchGifts = useCallback(async () => {
    const res = await prisma.gift.findMany();
    setGifts(res)
  }, [])

  React.useEffect(() => {
    fetchGifts().then().catch(e => console.log(e))
  }, [])
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
