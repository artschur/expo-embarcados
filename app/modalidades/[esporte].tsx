import { INTERESSE_KEY, formatHorario, partidas } from '@/constants/PartidasData';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { modalidadesToShow } from '../(tabs)/modalidades';

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

export default function ModalidadeEsporteScreen() {
  const { esporte } = useLocalSearchParams();
  const [interesse, setInteresse] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? dark : light;
  const router = useRouter();
  console.log(esporte);

  if (!esporte) {
    router.push('/modalidades');
  }

  if (!modalidadesToShow) {
    router.push('/modalidades');
  }

  const modalidadeImage = modalidadesToShow.find((modalidade) => modalidade.nome.toLowerCase() === esporte)?.imagem;

  const partidasEsporte = partidas.filter(
    (partida) => partida.esporte.toLowerCase() === (esporte as string).toLowerCase(),
  );

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

  const partidasInteresse = partidasEsporte.filter((partida) => interesse.includes(partida.id));
  const partidasDisponiveis = partidasEsporte.filter((partida) => !interesse.includes(partida.id));

  if (partidasEsporte.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.header, { color: theme.text }]}>Esporte não encontrado</Text>
        <Text style={[styles.empty, { color: theme.empty }]}>Não há partidas cadastradas para {esporte}.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
      <Image source={{ uri: modalidadeImage }} style={{ width: '100%', height: 200 }} />
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
        {partidasInteresse.length > 0 && (
          <>
            <Text style={[styles.sectionHeader, { color: theme.text }]}>Partidas Salvas</Text>
            {partidasInteresse.map((partida) => (
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
          </>
        )}

        <Text style={[styles.sectionHeader, { color: theme.text }]}>Partidas Disponíveis</Text>
        {partidasDisponiveis.length === 0 && (
          <Text style={[styles.empty, { color: theme.empty }]}>Todas as partidas de {esporte} estão salvas.</Text>
        )}
        {partidasDisponiveis.map((partida) => (
          <View key={partida.id} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.info}>
              <Text style={[styles.times, { color: theme.text }]}>
                {partida.timeA} <Text style={styles.vs}>vs</Text> {partida.timeB}
              </Text>
              <Text style={{ color: theme.empty }}>{partida.local}</Text>

              <Text style={[styles.horario, { color: theme.empty }]}>{formatHorario(partida.inicio, partida.fim)}</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonAdd, { backgroundColor: theme.buttonAdd, borderColor: theme.border }]}
              onPress={() => adicionarInteresse(partida.id)}
            >
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>Salvar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    gap: 16,
    paddingBottom: 64,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    flex: 1,
  },
  sectionHeader: {
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
