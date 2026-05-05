import { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Tarefa } from '../src/types/Tarefa';
import TaskItem from '../src/components/TaskItem';

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: '1', titulo: 'Estudar React Native', completa: false },
    { id: '2', titulo: 'Fazer exercícios', completa: true },
    { id: '3', titulo: 'Ler documentação', completa: false },
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState('');

  function addTask() {
    if (!novaTarefa.trim()) return;

    const task = {
      id: Date.now().toString(),
      titulo: novaTarefa,
      completa: false
    };

    setTarefas([...tarefas, task]);
    setNovaTarefa('');
    setMostrarModal(false);
  }
  
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
            <TaskItem Tarefa={item}/>
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
        <TouchableOpacity style={styles.addButton} onPress={() => setMostrarModal(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

       {/* MODAL */}
      <Modal visible={mostrarModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>

            <TextInput placeholder="Digite a tarefa..." value={novaTarefa} onChangeText={setNovaTarefa} style={styles.input}/>

            <TouchableOpacity style={styles.saveButton} onPress={addTask}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelarButton} onPress={() => setMostrarModal(false)}>
              <Text style={styles.cancelarButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff'
  },
  cancelarButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  cancelarButtonText: {
    color: '#fff'
  }

});
