import { ImageBackground, StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import bg from '@/assets/images/bg2.png';
import fibelek from '@/assets/images/fibalek.png';
import RegistrationForm from '@/components/registration-components/RegistrationForm';
import KeyboardTouchDismiss from '@/components/reusable/KeyboardTouchDismiss';

export default function IntroScreen() {
  return (
    <ImageBackground style={styles.container} resizeMode='stretch' source={bg}>
      <KeyboardTouchDismiss>
        <>
          <View style={{ marginBottom: "-3%", flex: 0.28, zIndex: 1000 }}>
            <Image source={fibelek} resizeMode='center' style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </View>
          <RegistrationForm />
        </>
      </KeyboardTouchDismiss>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '5%'
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
