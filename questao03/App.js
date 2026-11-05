import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  // Estados para gerir a transição entre o ecrã de registo inicial e o ecrã de controlo
  const [fase, setFase] = useState('registo'); 
  
  // Dados do produto
  const [nomeProduto, setNomeProduto] = useState('');
  const [estoqueAtual, setEstoqueAtual] = useState(0);
  
  // Inputs transitórios
  const [inputQtdInicial, setInputQtdInicial] = useState('');
  const [inputMovimentacao, setInputMovimentacao] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const iniciarSistema = () => {
    Keyboard.dismiss();
    setMensagemErro('');
    
    if (nomeProduto.trim() === '') {
      setMensagemErro('Por favor, preencha o nome do produto.');
      return;
    }

    const qtdInicial = parseInt(inputQtdInicial, 10);
    if (isNaN(qtdInicial) || qtdInicial < 0) {
      setMensagemErro('Introduza uma quantidade inicial válida (zero ou superior).');
      return;
    }

    setEstoqueAtual(qtdInicial);
    setFase('controle');
  };

  const adicionarEstoque = () => {
    Keyboard.dismiss();
    setMensagemErro('');
    
    const qtd = parseInt(inputMovimentacao, 10);
    if (isNaN(qtd) || qtd <= 0) {
      setMensagemErro('Introduza um valor válido para adicionar.');
      return;
    }

    setEstoqueAtual(estoqueAtual + qtd);
    setInputMovimentacao('');
  };

  const retirarEstoque = () => {
    Keyboard.dismiss();
    setMensagemErro('');
    
    const qtd = parseInt(inputMovimentacao, 10);
    if (isNaN(qtd) || qtd <= 0) {
      setMensagemErro('Introduza um valor válido para retirar.');
      return;
    }

    if (qtd > estoqueAtual) {
      setMensagemErro('Operação recusada: A retirada é superior ao disponível.');
      return;
    }

    setEstoqueAtual(estoqueAtual - qtd);
    setInputMovimentacao('');
  };

  const voltarConfiguracao = () => {
    setFase('registo');
    setNomeProduto('');
    setInputQtdInicial('');
    setInputMovimentacao('');
    setMensagemErro('');
  };

  return (
    <View style={styles.container}>
      {fase === 'registo' ? (
        // ECRÃ 1: Definição Inicial
        <View style={styles.card}>
          <Text style={styles.title}>Registo de Produto</Text>
          
          <Text style={styles.label}>Nome do produto:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Cadernos"
            value={nomeProduto}
            onChangeText={setNomeProduto}
          />

          <Text style={styles.label}>Quantidade inicial:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 20"
            value={inputQtdInicial}
            onChangeText={setInputQtdInicial}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={iniciarSistema}>
            <Text style={styles.buttonText}>Iniciar Controle</Text>
          </TouchableOpacity>

          {mensagemErro !== '' && <Text style={styles.errorText}>{mensagemErro}</Text>}
        </View>
      ) : (
        // ECRÃ 2: Controlo e Movimentação
        <View style={styles.card}>
          <Text style={styles.title}>Controle de Estoque</Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.productName}>{nomeProduto}</Text>
            <Text style={styles.stockValue}>{estoqueAtual} unidades</Text>
          </View>

          {/* Alerta de inventário baixo (< 5 unidades) */}
          {estoqueAtual < 5 && (
            <View style={styles.alertBox}>
              <Text style={styles.alertText}>⚠️ Alerta: Restam menos de 5 unidades!</Text>
            </View>
          )}

          <Text style={styles.label}>Movimentação (Qtd):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 7"
            value={inputMovimentacao}
            onChangeText={setInputMovimentacao}
          />

          <View style={styles.rowButtons}>
            <TouchableOpacity style={[styles.buttonAction, styles.buttonAdd]} onPress={adicionarEstoque}>
              <Text style={styles.buttonText}>Adicionar estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonAction, styles.buttonRemove]} onPress={retirarEstoque}>
              <Text style={styles.buttonText}>Retirar estoque</Text>
            </TouchableOpacity>
          </View>

          {mensagemErro !== '' && <Text style={styles.errorText}>{mensagemErro}</Text>}

          <TouchableOpacity style={styles.buttonReset} onPress={voltarConfiguracao}>
            <Text style={styles.buttonResetText}>Registar novo produto</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 12,
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
  label: {
    fontSize: 16,
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
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 5,
  },
  stockValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  alertBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#F87171',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  alertText: {
    color: '#DC2626',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAction: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  buttonAdd: {
    backgroundColor: '#10B981',
  },
  buttonRemove: {
    backgroundColor: '#EF4444',
  },
  errorText: {
    color: '#DC2626',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonReset: {
    marginTop: 30,
    alignItems: 'center',
  },
  buttonResetText: {
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
});