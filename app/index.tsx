import { useMemo, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Tarefa } from '../src/types/Tarefa';
import TaskItem from '../src/components/TarefaItem';

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: '1', titulo: 'Estudar React Native', completa: false },
    { id: '2', titulo: 'Fazer exercícios', completa: true },
    { id: '3', titulo: 'Ler documentação', completa: false },
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState('');

  const tarefasCompletas = useMemo(
    () => tarefas.filter((tarefa) => tarefa.completa).length,
    [tarefas]
  );

  function adicionarTarefa() {
    if (!novaTarefa.trim()) return;

    const tarefa: Tarefa = {
      id: Date.now().toString(),
      titulo: novaTarefa,
      completa: false,
    };

    setTarefas((prev) => [...prev, tarefa]);
    setNovaTarefa('');
    setMostrarModal(false);
  }

  function removeTarefa(id: string) {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));
  }

  function confirmeTarefa(id: string) {
    const updated = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, completa: !tarefa.completa } : tarefa
    );
    setTarefas(updated);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Tarefas</Text>
        <Text style={styles.subtitle}>Organize o seu dia com um visual leve e intuitivo.</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBadge}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{tarefas.length}</Text>
          </View>
          <View style={styles.statBadge}> 
            <Text style={styles.statLabel}>Concluídas</Text>
            <Text style={styles.statValue}>{tarefasCompletas}</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem tarefa={item} onRemover={() => removeTarefa(item.id)} onConfirmar={() => confirmeTarefa(item.id)} />
          )}
          contentContainerStyle={tarefas.length === 0 ? styles.emptyList : styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhuma tarefa cadastrada</Text>
              <Text style={styles.emptySubtext}>Adicione uma tarefa usando o botão abaixo.</Text>
            </View>
          }
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setMostrarModal(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={mostrarModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView
              style={styles.modalContent}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <Text style={styles.modalTitle}>Nova tarefa</Text>
              <Text style={styles.modalSubtitle}>Escreva a tarefa que deseja adicionar.</Text>

              <TextInput
                placeholder="Digite a tarefa..."
                value={novaTarefa}
                onChangeText={setNovaTarefa}
                style={styles.input}
                placeholderTextColor="#9ca3af"
              />

              <TouchableOpacity style={styles.saveButton} onPress={adicionarTarefa}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setMostrarModal(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: '#5b21b6',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    color: '#d8b4fe',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBadge: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 14,
    marginRight: 10,
  },
  statLabel: {
    color: '#e9d5ff',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 90,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 90,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4b5563',
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 260,
  },
  footer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  addButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 20,
    elevation: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 34,
    lineHeight: 36,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(15,23,42,0.48)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    elevation: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 16,
  },
});
