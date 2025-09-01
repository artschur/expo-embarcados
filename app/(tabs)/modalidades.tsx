import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Modalidades {
  id: number;
  nome: string;
  imagem: string;
}

const modalidadesToShow: Modalidades[] = [
  {
    id: 1,
    nome: 'Futebol',
    imagem:
      'https://plus.unsplash.com/premium_photo-1661868926397-0083f0503c07?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    nome: 'Basquete',
    imagem:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2380&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    nome: 'Vôlei',
    imagem:
      'https://images.unsplash.com/photo-1666901356149-93f2eb3ba5a2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    nome: 'Natação',
    imagem:
      'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=2900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    nome: 'Atletismo',
    imagem:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function ModalidadesScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Modalidades</Text>
      {modalidadesToShow.map((modalidade) => (
        <TouchableOpacity
          key={modalidade.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: `/modalidades/[esporte]`,
              params: { esporte: modalidade.nome.toLowerCase(), modal: 'true' },
            })
          }
        >
          <Image source={{ uri: modalidade.imagem }} style={styles.image} />
          <Text style={styles.nome}>{modalidade.nome}</Text>
          <Text style={styles.tapHint}>Toque para ver as partidas →</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    fontSize: 28,
    paddingTop: 48,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  info: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 2,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
  },

  card: {
    backgroundColor: '#333',
    borderRadius: 16,
    color: '#fff',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 4,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  tapHint: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
