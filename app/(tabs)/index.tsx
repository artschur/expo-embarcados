import { Image } from 'expo-image';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const eventDate = '12 a 18 de agosto de 2024';
const bgImage =
  'https://images.unsplash.com/photo-1689301109191-ff1f55d2e243?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function HomeScreen() {
  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={'https://www1.udesc.br/agencia/arquivos/11627/images/JUBs.jpg'} style={styles.reactLogo} />
        <Text style={styles.title}>Jogos Universitários Brasileiros em Florianópolis</Text>
        <Text style={styles.date}>{eventDate}</Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 18,
  },
  reactLogo: {
    height: 240,
    width: 240,
    borderRadius: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
