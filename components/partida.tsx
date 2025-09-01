import { Partida } from '@/constants/PartidasData';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { formatHorario } from '@/constants/PartidasData';
import React from 'react';

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

export function PartidaView({
  partida,
  adicionarInteresse,
  removerInteresse,
}: {
  partida: Partida;
  adicionarInteresse?: (id: string) => void;
  removerInteresse: (id: string) => void;
}) {
  <View key={partida.id} style={[styles.card, { backgroundColor: dark.card, borderColor: dark.border }]}>
    <View style={styles.info}>
      <Text style={[styles.times, { color: dark.text }]}>
        {partida.timeA} <Text style={styles.vs}>vs</Text> {partida.timeB}
      </Text>
      <Text style={{ color: dark.empty }}>{partida.local}</Text>
      <Text style={[styles.horario, { color: dark.empty }]}>{formatHorario(partida.inicio, partida.fim)}</Text>
    </View>
    <TouchableOpacity
      style={[
        styles.button,
        styles.buttonRemove,
        {
          backgroundColor: dark.buttonRemove,
          borderColor: dark.border,
        },
      ]}
      onPress={() => removerInteresse(partida.id)}
    >
      <Text style={[styles.buttonText, { color: dark.buttonText }]}>Remover</Text>
    </TouchableOpacity>
  </View>;
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
