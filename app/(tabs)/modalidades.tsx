import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

interface Modalidades {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  local: string;
  data: string;
  horario: string;
  regras: string;
}

const modalidadesToShow: Modalidades[] = [
  {
    id: 1,
    nome: 'Futebol',
    descricao: 'Jogo de futebol com times universitários.',
    imagem:
      'https://plus.unsplash.com/premium_photo-1661868926397-0083f0503c07?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    local: 'Estádio Universitário',
    data: '12/08/2024',
    horario: '15:00',
    regras: 'Partida com dois tempos de 45 minutos. Cada time pode fazer até 3 substituições.',
  },
  {
    id: 2,
    nome: 'Basquete',
    descricao: 'Partidas emocionantes de basquete universitário.',
    imagem:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2380&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    local: 'Ginásio Poliesportivo',
    data: '13/08/2024',
    horario: '18:00',
    regras: 'Jogo com 4 quartos de 10 minutos. Cada equipe pode pedir até 2 tempos técnicos por partida.',
  },
  {
    id: 3,
    nome: 'Vôlei',
    descricao: 'Competições de vôlei entre universidades.',
    imagem:
      'https://images.unsplash.com/photo-1666901356149-93f2eb3ba5a2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    local: 'Quadra Coberta',
    data: '14/08/2024',
    horario: '16:00',
    regras: 'Melhor de 5 sets. Cada set vai até 25 pontos, com diferença mínima de 2 pontos.',
  },
  {
    id: 4,
    nome: 'Natação',
    descricao: 'Provas de natação com atletas universitários.',
    imagem:
      'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=2900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    local: 'Piscina Olímpica',
    data: '15/08/2024',
    horario: '09:00',
    regras: 'Provas de 50m, 100m e 200m livre. Cada atleta pode participar de até 2 provas individuais.',
  },
  {
    id: 5,
    nome: 'Atletismo',
    descricao: 'Eventos de atletismo para estudantes universitários.',
    imagem:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    local: 'Pista de Atletismo',
    data: '16/08/2024',
    horario: '08:00',
    regras: 'Corridas de 100m, 400m e revezamento 4x100m. Saltos e arremessos também inclusos.',
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
          <Text style={styles.info}>
            <Text style={styles.label}>Local:</Text> {modalidade.local}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Data:</Text> {modalidade.data}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Horário:</Text> {modalidade.horario}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Regras:</Text> {modalidade.regras}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
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
});
