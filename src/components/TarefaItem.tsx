import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tarefa } from "../types/Tarefa";

export default function TaskItem({ Tarefa, onRemover, onCofirmar }: { Tarefa: Tarefa; onRemover: () => void; onCofirmar: () => void }) {
    return(
        <TouchableOpacity style={styles.container} onPress={() => onCofirmar()}>
            <View style={styles.taskInfo}>
              <View style={[styles.checkbox, Tarefa.completa && styles.checked]} />
              <Text style={[styles.text, Tarefa.completa && styles.completedText]}>{Tarefa.titulo}</Text>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={onRemover}>
              <Text style={styles.deleteButtonText}>x</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}   

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },

  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 10
  },

  checked: {
    backgroundColor: '#28a745'
  },

  text: {
    fontSize: 16,
    flexShrink: 1
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#999'
  },

  deleteButton: {
    width: 20,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#b9323f',
    justifyContent: 'center',
    alignItems: 'center'
  },

  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});