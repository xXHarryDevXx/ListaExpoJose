import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  const [temperatura, setTemperatura] = useState('');
  const [sentido, setSentido] = useState('CtoF'); // 'CtoF' (Celsius para Fahrenheit) ou 'FtoC'
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const converterTemperatura = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado('');

    if (temperatura.trim() === '') {
      setErro('Por favor, introduza um valor para a temperatura.');
      return;
    }

    const tempNum = parseFloat(temperatura.replace(',', '.'));

    if (isNaN(tempNum)) {
      setErro('Por favor, introduza um valor numérico válido.');
      return;
    }

    let tempConvertida = 0;
    let textoResultado = '';

    if (sentido === 'CtoF') {
      // F = (C × 9/5) + 32
      tempConvertida = (tempNum * 9 / 5) + 32;
      textoResultado = `${tempNum} ºC ➔ ${tempConvertida.toFixed(1).replace('.', ',')} ºF`;
    } else {
      // C = (F - 32) × 5/9
      tempConvertida = (tempNum - 32) * 5 / 9;
      textoResultado = `${tempNum} ºF ➔ ${tempConvertida.toFixed(1).replace('.', ',')} ºC`;
    }

    setResultado(textoResultado);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Conversor de Temperatura</Text>

        <Text style={styles.label}>Selecione o sentido da conversão:</Text>
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={[styles.typeButton, sentido === 'CtoF' && styles.typeButtonActive]}
            onPress={() => setSentido('CtoF')}
          >
            <Text style={[styles.typeButtonText, sentido === 'CtoF' && styles.typeButtonTextActive]}>
              ºC para ºF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, sentido === 'FtoC' && styles.typeButtonActive]}
            onPress={() => setSentido('FtoC')}
          >
            <Text style={[styles.typeButtonText, sentido === 'FtoC' && styles.typeButtonTextActive]}>
              ºF para ºC
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>
          Temperatura em {sentido === 'CtoF' ? 'Celsius (ºC)' : 'Fahrenheit (ºF)'}:
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder={sentido === 'CtoF' ? 'Ex: 30' : 'Ex: 86'}
          value={temperatura}
          onChangeText={setTemperatura}
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={converterTemperatura}>
          <Text style={styles.buttonPrimaryText}>Converter</Text>
        </TouchableOpacity>

        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

        {resultado !== '' && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{resultado}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0284C7',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 10,
    fontWeight: '600',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#F8FAFC',
  },
  typeButtonActive: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  typeButtonText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: 'bold',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#F8FAFC',
  },
  buttonPrimary: {
    backgroundColor: '#0EA5E9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7DD3FC',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0369A1',
  },
});