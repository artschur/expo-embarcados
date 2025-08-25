import { StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const alojamentos = [
  {
    id: '1',
    nome: 'Alojamento Central',
    tipo: 'No Campus',
    localizacao: 'Próximo ao refeitório',
    imagem: 'https://example.com/central.jpg',
  },
  {
    id: '2',
    nome: 'Pousada Universitária',
    tipo: 'Arredores',
    localizacao: 'Rua das Flores, 123',
    imagem: 'https://example.com/pousada.jpg',
  },
  {
    id: '3',
    nome: 'Hotel Estudantil',
    tipo: 'Arredores',
    localizacao: 'Av. Principal, 456',
    imagem: 'https://example.com/hotel.jpg',
  },
];

export default function AlojamentosScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Alojamentos</Text>
      {alojamentos.map((alojamento) => (
        <TouchableOpacity
          key={alojamento.id}
          style={styles.card}
          onPress={() => router.push(`/alojamentos/${alojamento.id}`)}
        >
          <Image source={{ uri: alojamento.imagem }} style={styles.image} />
          <Text style={styles.nome}>{alojamento.nome}</Text>
          <Text style={styles.tipo}>{alojamento.tipo}</Text>
          <Text style={styles.localizacao}>{alojamento.localizacao}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 24 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, alignItems: 'center', elevation: 3 },
  image: { width: 120, height: 80, borderRadius: 8, marginBottom: 12, backgroundColor: '#eee' },
  nome: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  tipo: { fontSize: 16, color: '#555', marginBottom: 2 },
  localizacao: { fontSize: 14, color: '#888' },
});
