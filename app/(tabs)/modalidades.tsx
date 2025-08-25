import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

interface Modalidades {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

const modalidadesToShow: Modalidades[] = [
  {
    id: 1,
    nome: 'Futebol',
    descricao: 'Jogo de futebol com times universitários.',
    imagem: 'https://example.com/futebol.jpg',
  },
  {
    id: 2,
    nome: 'Basquete',
    descricao: 'Partidas emocionantes de basquete universitário.',
    imagem: 'https://example.com/basquete.jpg',
  },
  {
    id: 3,
    nome: 'Vôlei',
    descricao: 'Competições de vôlei entre universidades.',
    imagem: 'https://example.com/volei.jpg',
  },
  {
    id: 4,
    nome: 'Natação',
    descricao: 'Provas de natação com atletas universitários.',
    imagem: 'https://example.com/natacao.jpg',
  },
  {
    id: 5,
    nome: 'Atletismo',
    descricao: 'Eventos de atletismo para estudantes universitários.',
    imagem: 'https://example.com/atletismo.jpg',
  },
];

export default function ModalidadesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Modalidades</Text>
      {modalidadesToShow.map((modalidade) => (
        <View style={styles.card} key={modalidade.id}>
          <Image source={{ uri: modalidade.imagem }} style={styles.image} />
          <Text style={styles.nome}>{modalidade.nome}</Text>
          <Text style={styles.descricao}>{modalidade.descricao}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    gap: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
