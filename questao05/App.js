import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  const [saldo, setSaldo] = useState(1000.0);
  const [valorInput, setValorInput] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const formatarMoeda = (valor) => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  const processarOperacao = (tipo) => {
    Keyboard.dismiss();
    setMensagemErro('');

    const valor = parseFloat(valorInput.replace(',', '.'));

    if (isNaN(valor) || valor <= 0) {
      setMensagemErro('Por favor, introduza um valor numérico positivo.');
      return;
    }

    if (tipo === 'sacar') {
      if (valor > saldo) {
        setMensagemErro('Operação recusada: Saldo insuficiente para este saque.');
        return;
      }
      setSaldo(saldo - valor);
    } else if (tipo === 'depositar') {
      setSaldo(saldo + valor);
    }

    setValorInput(''); // Limpa o campo após o sucesso da operação
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Simulador Bancário</Text>

        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Saldo Atual</Text>
          <Text style={styles.balanceValue}>{formatarMoeda(saldo)}</Text>
        </View>

        <Text style={styles.label}>Valor da operação (R$):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex: 150,00"
          value={valorInput}
          onChangeText={setValorInput}
        />

        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={[styles.button, styles.buttonDeposit]}
            onPress={() => processarOperacao('depositar')}
          >
            <Text style={styles.buttonText}>Depositar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonWithdraw]}
            onPress={() => processarOperacao('sacar')}
          >
            <Text style={styles.buttonText}>Sacar</Text>
          </TouchableOpacity>
        </View>

        {mensagemErro !== '' && <Text style={styles.errorText}>{mensagemErro}</Text>}
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
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  balanceBox: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  balanceLabel: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 5,
  },
  balanceValue: {
    color: '#10B981',
    fontSize: 32,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  buttonDeposit: {
    backgroundColor: '#10B981', // Verde
  },
  buttonWithdraw: {
    backgroundColor: '#EF4444', // Vermelho
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#DC2626',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});