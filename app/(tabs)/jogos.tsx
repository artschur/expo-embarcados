import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';

const partidas = [
  {
    id: '1',
    esporte: 'Futebol',
    timeA: 'Tigres',
    timeB: 'Leões',
    inicio: '2024-06-10T14:00:00',
    fim: '2024-06-10T15:30:00',
  },
  {
    id: '2',
    esporte: 'Basquete',
    timeA: 'Águias',
    timeB: 'Tubas',
    inicio: '2024-06-10T16:00:00',
    fim: '2024-06-10T17:30:00',
  },
  {
    id: '3',
    esporte: 'Vôlei',
    timeA: 'Raposas',
    timeB: 'Corujas',
    inicio: '2024-06-11T09:00:00',
    fim: '2024-06-11T10:30:00',
  },
  {
    id: '4',
    esporte: 'Natação',
    timeA: 'Equipe Azul',
    timeB: 'Equipe Verde',
    inicio: '2024-06-11T11:00:00',
    fim: '2024-06-11T12:00:00',
  },
  {
    id: '5',
    esporte: 'Atletismo',
    timeA: 'Relâmpagos',
    timeB: 'Falcões',
    inicio: '2024-06-11T13:00:00',
    fim: '2024-06-11T14:30:00',
  },
  {
    id: '6',
    esporte: 'Handebol',
    timeA: 'Lobos',
    timeB: 'Onças',
    inicio: '2024-06-12T09:00:00',
    fim: '2024-06-12T10:30:00',
  },
  {
    id: '7',
    esporte: 'Tênis',
    timeA: 'Dupla 1',
    timeB: 'Dupla 2',
    inicio: '2024-06-12T11:00:00',
    fim: '2024-06-12T12:30:00',
  },
  {
    id: '8',
    esporte: 'Judô',
    timeA: 'Equipe Norte',
    timeB: 'Equipe Sul',
    inicio: '2024-06-12T13:00:00',
    fim: '2024-06-12T14:00:00',
  },
  {
    id: '9',
    esporte: 'Xadrez',
    timeA: 'Cavalos',
    timeB: 'Peões',
    inicio: '2024-06-13T09:00:00',
    fim: '2024-06-13T11:00:00',
  },
  {
    id: '10',
    esporte: 'Rugby',
    timeA: 'Tubarões',
    timeB: 'Dragões',
    inicio: '2024-06-13T14:00:00',
    fim: '2024-06-13T15:30:00',
  },
];

const INTERESSE_KEY = 'partidas_interesse';

const light = {
  background: '#f6f5f4',
  card: '#fff',
  border: '#ececec',
  text: '#222',
  buttonAdd: '#ececec',
  buttonRemove: '#f7e9e9',
  buttonText: '#222',
  empty: '#888',
};

const dark = {
  background: '#181818',
  card: '#232323',
  border: '#333',
  text: '#f6f5f4',
  buttonAdd: '#333',
  buttonRemove: '#3a2323',
  buttonText: '#f6f5f4',
  empty: '#aaa',
};

function formatHorario(inicio: string, fim: string) {
  const inicioDate = new Date(inicio);
  const fimDate = new Date(fim);

  const dia = inicioDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const horaInicio = inicioDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const horaFim = fimDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return `${dia} • ${horaInicio} às ${horaFim}`;
}

export default function JogosScreen() {
  const [interesse, setInteresse] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? dark : light;

  useEffect(() => {
    AsyncStorage.getItem(INTERESSE_KEY).then((data) => {
      if (data) setInteresse(JSON.parse(data));
    });
  }, []);

  const adicionarInteresse = async (id: string) => {
    if (!interesse.includes(id)) {
      const novaLista = [...interesse, id];
      setInteresse(novaLista);
      await AsyncStorage.setItem(INTERESSE_KEY, JSON.stringify(novaLista));
    }
  };

  const removerInteresse = async (id: string) => {
    const novaLista = interesse.filter((partidaId) => partidaId !== id);
    setInteresse(novaLista);
    await AsyncStorage.setItem(INTERESSE_KEY, JSON.stringify(novaLista));
  };

  const partidasInteresse = partidas.filter((partida) => interesse.includes(partida.id));
  const partidasDisponiveis = partidas.filter((partida) => !interesse.includes(partida.id));

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Partidas de Interesse</Text>
      {partidasInteresse.length === 0 && (
        <Text style={[styles.empty, { color: theme.empty }]}>Nenhuma partida adicionada à lista de interesse.</Text>
      )}
      {partidasInteresse.map((partida) => (
        <View key={partida.id} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.info}>
            <Text style={[styles.esporte, { color: theme.text }]}>{partida.esporte}</Text>
            <Text style={[styles.times, { color: theme.text }]}>
              {partida.timeA} <Text style={styles.vs}>vs</Text> {partida.timeB}
            </Text>
            <Text style={[styles.horario, { color: theme.empty }]}>{formatHorario(partida.inicio, partida.fim)}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonRemove,
              { backgroundColor: theme.buttonRemove, borderColor: theme.border },
            ]}
            onPress={() => removerInteresse(partida.id)}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>Remover</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={[styles.header, { color: theme.text }]}>Partidas Disponíveis</Text>
      {partidasDisponiveis.length === 0 && (
        <Text style={[styles.empty, { color: theme.empty }]}>Todas as partidas estão na sua lista de interesse.</Text>
      )}
      {partidasDisponiveis.map((partida) => (
        <View key={partida.id} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.info}>
            <Text style={[styles.esporte, { color: theme.text }]}>{partida.esporte}</Text>
            <Text style={[styles.times, { color: theme.text }]}>
              {partida.timeA} <Text style={styles.vs}>vs</Text> {partida.timeB}
            </Text>
            <Text style={[styles.horario, { color: theme.empty }]}>{formatHorario(partida.inicio, partida.fim)}</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonAdd, { backgroundColor: theme.buttonAdd, borderColor: theme.border }]}
            onPress={() => adicionarInteresse(partida.id)}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    paddingBottom: 64,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  info: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 12,
  },
  esporte: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  times: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  vs: {
    fontWeight: 'normal',
    color: '#888',
    fontSize: 16,
    marginHorizontal: 4,
  },
  horario: {
    fontSize: 15,
    marginTop: 4,
    fontStyle: 'italic',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonAdd: {},
  buttonRemove: {},
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  empty: {
    fontSize: 15,
    fontStyle: 'italic',
    marginBottom: 8,
    marginLeft: 8,
  },
});
