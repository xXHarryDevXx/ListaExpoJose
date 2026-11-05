import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [votos1, setVotos1] = useState(0);
  const [votos2, setVotos2] = useState(0);
  const [votos3, setVotos3] = useState(0);

  const candidato1 = "Alice";
  const candidato2 = "Bruno";
  const candidato3 = "Carlos";

  const totalGeral = votos1 + votos2 + votos3;

  const determinarResultado = () => {
    if (totalGeral === 0) return "Nenhum voto registado.";

    const maxVotos = Math.max(votos1, votos2, votos3);
    const lideres = [];

    if (votos1 === maxVotos) lideres.push(candidato1);
    if (votos2 === maxVotos) lideres.push(candidato2);
    if (votos3 === maxVotos) lideres.push(candidato3);

    if (lideres.length > 1) {
      return `Empate na liderança: ${lideres.join(' e ')} com ${maxVotos} votos.`;
    } else {
      return `Líder atual: ${lideres[0]} com ${maxVotos} votos.`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eleição Estudantil</Text>

      <View style={styles.card}>
        <View style={styles.candidatoContainer}>
          <Text style={styles.candidatoNome}>{candidato1}</Text>
          <Text style={styles.candidatoVotos}>Votos: {votos1}</Text>
          <TouchableOpacity style={[styles.button, styles.buttonVotar]} onPress={() => setVotos1(votos1 + 1)}>
            <Text style={styles.buttonText}>Votar em {candidato1}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.candidatoContainer}>
          <Text style={styles.candidatoNome}>{candidato2}</Text>
          <Text style={styles.candidatoVotos}>Votos: {votos2}</Text>
          <TouchableOpacity style={[styles.button, styles.buttonVotar]} onPress={() => setVotos2(votos2 + 1)}>
            <Text style={styles.buttonText}>Votar em {candidato2}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.candidatoContainer}>
          <Text style={styles.candidatoNome}>{candidato3}</Text>
          <Text style={styles.candidatoVotos}>Votos: {votos3}</Text>
          <TouchableOpacity style={[styles.button, styles.buttonVotar]} onPress={() => setVotos3(votos3 + 1)}>
            <Text style={styles.buttonText}>Votar em {candidato3}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultadosContainer}>
        <Text style={styles.totalTexto}>Total Geral de Votos: {totalGeral}</Text>
        <Text style={styles.statusTexto}>{determinarResultado()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  candidatoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 15,
  },
  candidatoNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
  },
  candidatoVotos: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonVotar: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultadosContainer: {
    backgroundColor: '#EFF6FF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 10,
  },
  statusTexto: {
    fontSize: 16,
    color: '#1E40AF',
    textAlign: 'center',
    fontWeight: '600',
  },
});