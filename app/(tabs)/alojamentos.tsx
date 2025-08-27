import { StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

interface alojamento {
  id: string;
  nome: string;
  tipo: string;
  localizacao: string;
  latitude: number;
  longitude: number;
  valorDiaria: number;
  fotos: string[];
  contato: {
    email: string;
    telefone: string;
    whatsapp: string;
  };
  descricao: string;
}

export const alojamentos: alojamento[] = [
  {
    id: '1',
    nome: 'Alojamento Central',
    tipo: 'No Campus',
    localizacao: 'Próximo ao refeitório',
    latitude: -27.8185,
    longitude: -50.3264,
    valorDiaria: 50,
    fotos: [
      'https://plus.unsplash.com/premium_photo-1679088034974-2c9c01d59992?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
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
    fotos: [
      'https://images.unsplash.com/photo-1709805619372-40de3f158e83?q=80&w=2390&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
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
    fotos: [
      'https://images.unsplash.com/photo-1586214601498-4dbcfd0bf2c8?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1717026785279-1b11d8255f9b?q=80&w=2314&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    contato: {
      email: 'he@edu.com',
      telefone: '+554977777777',
      whatsapp: '+554977777777',
    },
    descricao: 'Hotel moderno com todas as comodidades para uma estadia agradável.',
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
          <Image source={{ uri: alojamento.fotos[0] }} style={styles.image} />
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
  card: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'flex-start',
    elevation: 3,
  },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12, backgroundColor: '#222' },
  nome: { fontSize: 28, fontWeight: 'bold', marginBottom: 4, color: '#fff' },
  tipo: { fontSize: 18, marginBottom: 2, color: '#ccc' },
  localizacao: { fontSize: 14, color: '#aaa' },
});
