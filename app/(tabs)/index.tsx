import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <Image source={'https://www1.udesc.br/agencia/arquivos/11627/images/JUBs.jpg'} style={styles.reactLogo} />
      <Text style={styles.title}>Jogos Universitarios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50%',
    gap: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
