import { formatHorario, INTERESSE_KEY, partidas } from '@/constants/PartidasData';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  background: '#000',
  card: '#232323',
  border: '#333',
  text: '#f6f5f4',
  buttonAdd: '#333',
  buttonRemove: '#3a2323',
  buttonText: '#f6f5f4',
  empty: '#aaa',
};

export default function JogosScreen() {
  const [interesse, setInteresse] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? dark : light;

  useFocusEffect(
    useCallback(() => {
      const fetchSavedMatches = async () => {
        setIsLoading(true);
        try {
          const data = await AsyncStorage.getItem(INTERESSE_KEY);
          if (data) {
            setInteresse(JSON.parse(data));
          } else {
            setInteresse([]);
          }
        } catch (error) {
          console.error('Error fetching saved matches:', error);
          setInteresse([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSavedMatches();
    }, []),
  );

  const removerInteresse = async (id: string) => {
    const novaLista = interesse.filter((partidaId) => partidaId !== id);
    setInteresse(novaLista);
    await AsyncStorage.setItem(INTERESSE_KEY, JSON.stringify(novaLista));
  };

  const partidasInteresse = partidas.filter((partida) => interesse.includes(partida.id));

  // Group matches by sport
  const partidasPorEsporte = partidasInteresse.reduce(
    (acc, partida) => {
      if (!acc[partida.esporte]) {
        acc[partida.esporte] = [];
      }
      acc[partida.esporte].push(partida);
      return acc;
    },
    {} as Record<string, typeof partidas>,
  );

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Minhas Partidas Salvas</Text>

      {isLoading ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.empty, { color: theme.empty }]}>Carregando partidas salvas...</Text>
        </View>
      ) : partidasInteresse.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.empty, { color: theme.empty }]}>Nenhuma partida salva ainda.</Text>
          <Text style={[styles.emptySubtext, { color: theme.empty }]}>
            Vá para a aba `Modalidades` e salve partidas que te interessam!
          </Text>
        </View>
      ) : (
        Object.entries(partidasPorEsporte).map(([esporte, partidasEsporte]) => (
          <View key={esporte} style={styles.sportSection}>
            <Text style={[styles.sportHeader, { color: theme.text }]}>{esporte}</Text>
            {partidasEsporte.map((partida) => (
              <View key={partida.id} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={styles.info}>
                  <Text style={[styles.times, { color: theme.text }]}>
                    {partida.timeA} <Text style={styles.vs}>vs</Text> {partida.timeB}
                  </Text>
                  <Text style={{ color: theme.empty }}>{partida.local}</Text>
                  <Text style={[styles.horario, { color: theme.empty }]}>
                    {formatHorario(partida.inicio, partida.fim)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonRemove,
                    {
                      backgroundColor: theme.buttonRemove,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => removerInteresse(partida.id)}
                >
                  <Text style={[styles.buttonText, { color: theme.buttonText }]}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  sportCard: {
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
  sportInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  sportName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  matchCount: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  interestButton: {
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
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
  interestButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  empty: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  sportSection: {
    marginBottom: 20,
  },
  sportHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 0.3,
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
});
