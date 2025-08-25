import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const alojamentos = [
  {
    id: '1',
    nome: 'Alojamento Central',
    tipo: 'No Campus',
    localizacao: 'Próximo ao refeitório',
    latitude: -27.8185,
    longitude: -50.3264,
    valorDiaria: 50,
    fotos: ['https://example.com/central1.jpg', 'https://example.com/central2.jpg'],
    contato: {
      email: 'central@campus.edu',
      telefone: '+554999999999',
      whatsapp: '+554999999999',
    },
    descricao: 'Alojamento dentro do campus, com fácil acesso às instalações universitárias.',
  },
  {
    id: '2',
    nome: 'Pousada Universitária',
    tipo: 'Arredores',
    localizacao: 'Rua das Flores, 123',
    latitude: -27.819,
    longitude: -50.327,
    valorDiaria: 70,
    fotos: ['https://example.com/pousada1.jpg', 'https://example.com/pousada2.jpg'],
    contato: {
      email: 'pousada@edu.com',
      telefone: '+554988888888',
      whatsapp: '+554988888888',
    },
    descricao: 'Pousada confortável próxima ao campus, ideal para estudantes e visitantes.',
  },
  {
    id: '3',
    nome: 'Hotel Estudantil',
    tipo: 'Arredores',
    localizacao: 'Av. Principal, 456',
    latitude: -27.82,
    longitude: -50.328,
    valorDiaria: 90,
    fotos: ['https://example.com/hotel1.jpg', 'https://example.com/hotel2.jpg'],
    contato: {
      email: 'he@edu.com',
      telefone: '+554977777777',
      whatsapp: '+554977777777',
    },
    descricao: 'Hotel moderno com todas as comodidades para uma estadia agradável.',
  },
];

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
  container: { padding: 24, alignItems: 'center', backgroundColor: '#f9f9f9' },
  fotosContainer: { flexDirection: 'row', marginBottom: 16 },
  foto: { width: 200, height: 120, borderRadius: 12, marginRight: 12, backgroundColor: '#eee' },
  nome: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  tipo: { fontSize: 18, color: '#555', marginBottom: 4 },
  localizacao: { fontSize: 16, color: '#888', marginBottom: 8 },
  descricao: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 8 },
  valorDiaria: { fontSize: 18, color: '#007b00', fontWeight: 'bold', marginBottom: 12 },
  mapa: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  contatoContainer: { width: '100%', marginTop: 12, backgroundColor: '#fff', borderRadius: 8, padding: 12 },
  contatoTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  contato: { fontSize: 16, color: '#333', marginBottom: 4 },
  appButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  appButtonText: {
    color: '#fff',
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
