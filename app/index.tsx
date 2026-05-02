import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tarefa } from '../src/types/Tarefa';

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: '1', titulo: 'Estudar React Native', completa: false },
    { id: '2', titulo: 'Fazer exercícios', completa: true },
    { id: '3', titulo: 'Ler documentação', completa: false },
  ]);
  
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>To-Do List</Text>
      </View>

      {/* BODY */}
      <View style={styles.body}>
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text>{item.titulo}</Text>
          )}
          ListEmptyComponent={
            <Text>
              Nenhuma tarefa cadastrada
            </Text>
          }
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  body: {
    flex: 1,
    padding: 10
  },
  footer: {
    padding: 10,
    alignItems: 'center'
  },
    addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30
  }
});
