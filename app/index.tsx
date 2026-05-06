import { useMemo, useState } from 'react';
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Tarefa } from '../src/types/Tarefa';
import TaskItem from '../src/components/TarefaItem';
import { TarefaService } from '../src/services/TarefaService';

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: '1', titulo: 'Estudar React Native', completa: false },
    { id: '2', titulo: 'Fazer exercícios', completa: true },
    { id: '3', titulo: 'Ler documentação', completa: false },
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'concluidas' | 'pendentes'>('todos');

  const tarefasCompletas = useMemo(
    () => TarefaService.contarTarefasCompletas(tarefas),
    [tarefas]
  );

  const tarefasFiltradas = useMemo(
    () => TarefaService.filtrarTarefas(tarefas, filtro),
    [tarefas, filtro]
  );

  function adicionarTarefa() {
    try {
      const novasTarefas = TarefaService.adicionarTarefa(tarefas, novaTarefa);
      setTarefas(novasTarefas);
      setNovaTarefa('');
      setMostrarModal(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro inesperado');
      }    
    }
  }

  function removeTarefa(id: string) {
    Alert.alert("Confirmar", "Deseja remover?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Remover", 
        style: "destructive", 
        onPress: () => {
          const novasTarefas = TarefaService.removerTarefa(tarefas, id);
          setTarefas(novasTarefas);
        }
      }
    ]);
  }

  function confirmeTarefa(id: string) {
    const novasTarefas = TarefaService.alternarStatusTarefa(tarefas, id);
    setTarefas(novasTarefas);
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

        <View style={styles.filterRow}>
          <TouchableOpacity style={[styles.filterButton, filtro === 'todos' && styles.filterButtonActive]} onPress={() => setFiltro('todos')}>
            <Text style={[styles.filterText, filtro === 'todos' && styles.filterTextActive]}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, filtro === 'pendentes' && styles.filterButtonActive]} onPress={() => setFiltro('pendentes')}>
            <Text style={[styles.filterText, filtro === 'pendentes' && styles.filterTextActive]}>Pendentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, filtro === 'concluidas' && styles.filterButtonActive]} onPress={() => setFiltro('concluidas')}>
            <Text style={[styles.filterText, filtro === 'concluidas' && styles.filterTextActive]}>Concluídas</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem tarefa={item} onRemover={() => removeTarefa(item.id)} onConfirmar={() => confirmeTarefa(item.id)} />
          )}
          contentContainerStyle={tarefasFiltradas.length === 0 ? styles.emptyList : styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>{filtro === 'pendentes' ? 'Nenhuma tarefa pendente' : filtro === 'concluidas' ?  'Nenhuma tarefa concluída'  : 'Nenhuma tarefa cadastrada'}</Text>
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
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d8b4fe',
  },
  filterTextActive: {
    color: '#4c1d95',
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
