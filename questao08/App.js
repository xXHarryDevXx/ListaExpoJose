import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  
  const [estudantes, setEstudantes] = useState([]);
  const [erro, setErro] = useState('');

  const registarEstudante = () => {
    Keyboard.dismiss();
    setErro('');

    // Validação de campos obrigatórios
    if (nome.trim() === '' || matricula.trim() === '' || email.trim() === '' || curso.trim() === '') {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validação de matrícula duplicada
    const matriculaExiste = estudantes.some(est => est.matricula === matricula.trim());
    if (matriculaExiste) {
      setErro('Erro: Já existe um estudante registado com esta matrícula.');
      return;
    }

    // Criar objeto e adicionar ao array
    const novoEstudante = {
      nome: nome.trim(),
      matricula: matricula.trim(),
      email: email.trim(),
      curso: curso.trim()
    };

    setEstudantes([...estudantes, novoEstudante]);

    // Limpar os campos do formulário
    setNome('');
    setMatricula('');
    setEmail('');
    setCurso('');
  };

  const removerEstudante = (matriculaParaRemover) => {
    // Filtra o array removendo o objeto com a matrícula correspondente
    const novaLista = estudantes.filter(est => est.matricula !== matriculaParaRemover);
    setEstudantes(novaLista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registo Académico</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Matrícula (Ex: 20260001)"
          keyboardType="numeric"
          value={matricula}
          onChangeText={setMatricula}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Curso (Ex: Licenciatura em Computação)"
          value={curso}
          onChangeText={setCurso}
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={registarEstudante}>
          <Text style={styles.buttonText}>Registar Estudante</Text>
        </TouchableOpacity>

        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}
      </View>

      <Text style={styles.listTitle}>Estudantes Registados ({estudantes.length})</Text>
      
      <ScrollView style={styles.listContainer}>
        {estudantes.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum estudante registado.</Text>
        ) : (
          estudantes.map((estudante) => (
            <View key={estudante.matricula} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardName}>{estudante.nome}</Text>
                <Text style={styles.cardBadge}>{estudante.matricula}</Text>
              </View>
              <Text style={styles.cardInfo}>📧 {estudante.email}</Text>
              <Text style={styles.cardInfo}>🎓 {estudante.curso}</Text>
              
              <TouchableOpacity 
                style={styles.buttonRemove} 
                onPress={() => removerEstudante(estudante.matricula)}
              >
                <Text style={styles.buttonRemoveText}>Remover Registo</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  buttonPrimary: {
    backgroundColor: '#0F172A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
  },
  cardBadge: {
    backgroundColor: '#DBEAFE',
    color: '#1D4ED8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  cardInfo: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 5,
  },
  buttonRemove: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  buttonRemoveText: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 14,
  },
});