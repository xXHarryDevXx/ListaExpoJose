import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState('');
  const [isErro, setIsErro] = useState(false);

  const calcularAgua = () => {
    Keyboard.dismiss(); // Oculta o teclado ao clicar no botão

    // 1. Validação de valores vazios
    if (peso.trim() === '') {
      setIsErro(true);
      setResultado('Por favor, preencha o campo com seu peso.');
      return;
    }

    const pesoNum = parseFloat(peso.replace(',', '.'));
    
    // 2. Validação de valores zero, negativos ou inválidos
    if (isNaN(pesoNum) || pesoNum <= 0) {
      setIsErro(true);
      setResultado('O peso deve ser um valor numérico maior que zero.');
      return;
    }

    // 3. Cálculo: (Peso * 35) dividido por 1000 para converter para litros
    const litrosDiario = (pesoNum * 35) / 1000;

    // 4. Formatação do resultado (trocando ponto por vírgula para o padrão brasileiro)
    setIsErro(false);
    setResultado(`${litrosDiario.toFixed(2).replace('.', ',')} litros por dia`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Hidratação</Text>
      
      {/* Campo de Peso */}
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 70"
        value={peso}
        onChangeText={setPeso}
      />
      
      {/* Botão Calcular */}
      <TouchableOpacity style={styles.button} onPress={calcularAgua}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {/* Exibição do Resultado ou Validação */}
      {resultado !== '' && (
        <View style={[styles.resultContainer, isErro ? styles.errorContainer : styles.successContainer]}>
          <Text style={[styles.resultText, isErro && styles.errorText]}>
            {resultado}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
  },
  successContainer: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
  },
});