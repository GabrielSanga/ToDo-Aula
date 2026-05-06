import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Tarefa } from '../types/Tarefa';

export default function TaskItem({ tarefa, onRemover, onConfirmar }: { tarefa: Tarefa; onRemover: () => void; onConfirmar: () => void }) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.85} onPress={onConfirmar}>
      <View style={styles.taskInfo}>
        <View style={[styles.checkbox, tarefa.completa && styles.checked]}>
          {tarefa.completa && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.text, tarefa.completa && styles.completedText]}>{tarefa.titulo}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={onRemover} activeOpacity={0.7}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 6,
  },

  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#c7d2fe',
    borderRadius: 10,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },

  checkmark: {
    color: '#ffffff',
    fontWeight: '700',
  },

  text: {
    fontSize: 16,
    color: '#111827',
    flexShrink: 1,
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },

  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#fb7185',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});