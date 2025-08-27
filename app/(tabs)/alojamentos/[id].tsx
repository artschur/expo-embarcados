import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { alojamentos } from '../alojamentos';

export default function AlojamentoDetalheScreen() {
  const { id } = useLocalSearchParams();
  const alojamento = alojamentos.find((a) => a.id === id);

  if (!alojamento) {
    return (
      <View style={styles.container}>
        <Text>Alojamento não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fotosContainer}>
        {alojamento.fotos.map((foto, idx) => (
          <Image key={idx} source={{ uri: foto }} style={styles.foto} />
        ))}
      </ScrollView>
      <Text style={styles.nome}>{alojamento.nome}</Text>
      <Text style={styles.tipo}>{alojamento.tipo}</Text>
      <Text style={styles.localizacao}>{alojamento.localizacao}</Text>
      <Text style={styles.descricao}>{alojamento.descricao}</Text>
      <Text style={styles.valorDiaria}>Valor da diária: R$ {alojamento.valorDiaria},00 por pessoa</Text>
      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: alojamento.latitude,
          longitude: alojamento.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: alojamento.latitude,
            longitude: alojamento.longitude,
          }}
          title={alojamento.nome}
        />
      </MapView>
      <View style={styles.contatoContainer}>
        <Text style={styles.contatoTitulo}>Contato para reserva:</Text>
        <TouchableOpacity
          style={[styles.appButton, styles.email]}
          onPress={() => Linking.openURL(`mailto:${alojamento.contato.email}`)}
        >
          <Text style={styles.appButtonText}>Enviar Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.appButton, styles.telefone]}
          onPress={() => Linking.openURL(`tel:${alojamento.contato.telefone.replace(/\D/g, '')}`)}
        >
          <Text style={styles.appButtonText}>Ligar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.appButton, styles.whatsapp]}
          onPress={() => Linking.openURL(`https://wa.me/${alojamento.contato.whatsapp.replace(/\D/g, '')}`)}
        >
          <Text style={styles.appButtonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 64, alignItems: 'flex-start', backgroundColor: '#222' },
  fotosContainer: { flexDirection: 'row', marginBottom: 16 },
  foto: { width: 450, height: 400, borderRadius: 12, marginRight: 12, backgroundColor: '#eee' },
  nome: { fontSize: 26, fontWeight: 'bold', marginBottom: 8, color: '#fff' },
  tipo: { fontSize: 18, color: '#ccc', marginBottom: 4 },
  localizacao: { fontSize: 16, color: '#ccc', marginBottom: 8 },
  descricao: { fontSize: 16, color: '#eee', textAlign: 'left', marginBottom: 8 },
  valorDiaria: { fontSize: 18, color: '#007b00', fontWeight: 'bold', marginBottom: 12 },
  mapa: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  contatoContainer: { width: '100%', marginTop: 12, backgroundColor: '#222', borderRadius: 8, padding: 12 },
  contatoTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  contato: { fontSize: 16, color: '#eee', marginBottom: 4 },
  appButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  appButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    backgroundColor: '#0072c6',
  },
  telefone: {
    backgroundColor: '#34b7f1',
  },
  whatsapp: {
    backgroundColor: '#25D366',
  },
});
