import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [desconto, setDesconto] = useState('');
  
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const aplicarDesconto = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado(null);

    if (nomeProduto.trim() === '') {
      setErro('Por favor, introduza o nome do produto.');
      return;
    }

    const precoNum = parseFloat(preco.replace(',', '.'));
    const descontoNum = parseFloat(desconto.replace(',', '.'));

    if (isNaN(precoNum) || precoNum < 0) {
      setErro('O preço original deve ser um valor numérico não negativo.');
      return;
    }

    if (isNaN(descontoNum) || descontoNum < 0 || descontoNum > 100) {
      setErro('O desconto deve ser um valor percentual entre 0 e 100.');
      return;
    }

    // Cálculo da economia e do preço final
    const valorEconomia = precoNum * (descontoNum / 100);
    const valorFinal = precoNum - valorEconomia;

    setResultado({
      nome: nomeProduto,
      economia: valorEconomia.toFixed(2).replace('.', ','),
      precoFinal: valorFinal.toFixed(2).replace('.', ','),
      percentual: descontoNum
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculadora de Descontos</Text>

        <Text style={styles.label}>Nome do produto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Ténis de Corrida"
          value={nomeProduto}
          onChangeText={setNomeProduto}
        />

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preço Original (R$):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Ex: 200,00"
              value={preco}
              onChangeText={setPreco}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Desconto (%):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Ex: 15"
              value={desconto}
              onChangeText={setDesconto}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.buttonPrimary} onPress={aplicarDesconto}>
          <Text style={styles.buttonText}>Aplicar desconto</Text>
        </TouchableOpacity>

        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

        {resultado && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Resumo da Compra</Text>
            <Text style={styles.resultItem}>Produto: <Text style={styles.resultHighlight}>{resultado.nome}</Text></Text>
            <Text style={styles.resultItem}>Economia: <Text style={styles.resultSuccess}>R$ {resultado.economia}</Text></Text>
            <View style={styles.divider} />
            <Text style={styles.resultFinal}>Preço Final: R$ {resultado.precoFinal}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  buttonPrimary: {
    backgroundColor: '#8B5CF6', // Roxo E-commerce
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B21B6',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultItem: {
    fontSize: 16,
    color: '#4C1D95',
    marginBottom: 8,
  },
  resultHighlight: {
    fontWeight: 'bold',
  },
  resultSuccess: {
    fontWeight: 'bold',
    color: '#059669', // Verde para a economia
  },
  divider: {
    height: 1,
    backgroundColor: '#C4B5FD',
    marginVertical: 15,
  },
  resultFinal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
});