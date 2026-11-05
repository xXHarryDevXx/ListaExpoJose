import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const calcularMedia = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado(null);

    // Validação do nome
    if (nome.trim() === '') {
      setErro('Por favor, preencha o nome do estudante.');
      return;
    }

    // Conversão de vírgula para ponto e formatação para número
    const n1 = parseFloat(nota1.replace(',', '.'));
    const n2 = parseFloat(nota2.replace(',', '.'));
    const n3 = parseFloat(nota3.replace(',', '.'));

    // Validação de preenchimento das notas
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      setErro('Por favor, preencha as três notas com valores numéricos.');
      return;
    }

    // Validação do intervalo entre 0 e 10
    if (n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || n3 < 0 || n3 > 10) {
      setErro('Todas as notas devem ser valores entre 0 e 10.');
      return;
    }

    // Cálculo da média aritmética
    const media = (n1 + n2 + n3) / 3;
    
    // Verificação da situação
    const situacao = media >= 7.0 ? 'Aprovado' : 'Reprovado';

    setResultado({
      nome: nome,
      media: media.toFixed(1).replace('.', ','),
      situacao: situacao,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema Académico</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do estudante"
        value={nome}
        onChangeText={setNome}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputNota]}
          keyboardType="numeric"
          placeholder="Nota 1"
          value={nota1}
          onChangeText={setNota1}
        />
        <TextInput
          style={[styles.input, styles.inputNota]}
          keyboardType="numeric"
          placeholder="Nota 2"
          value={nota2}
          onChangeText={setNota2}
        />
        <TextInput
          style={[styles.input, styles.inputNota]}
          keyboardType="numeric"
          placeholder="Nota 3"
          value={nota3}
          onChangeText={setNota3}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularMedia}>
        <Text style={styles.buttonText}>Calcular média</Text>
      </TouchableOpacity>

      {erro !== '' && (
        <Text style={styles.errorText}>{erro}</Text>
      )}

      {resultado && (
        <View style={[styles.resultContainer, resultado.situacao === 'Aprovado' ? styles.successContainer : styles.failContainer]}>
          <Text style={styles.resultName}>Estudante: {resultado.nome}</Text>
          <Text style={styles.resultMedia}>Média: {resultado.media}</Text>
          <Text style={[styles.resultStatus, resultado.situacao === 'Aprovado' ? styles.successText : styles.failText]}>
            Situação: {resultado.situacao}
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
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F2937',
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputNota: {
    width: '31%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 25,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  successContainer: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  failContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  resultName: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 5,
  },
  resultMedia: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  resultStatus: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText: {
    color: '#059669',
  },
  failText: {
    color: '#DC2626',
  },
});