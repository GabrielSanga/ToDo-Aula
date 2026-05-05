import { View, Text, StyleSheet } from "react-native";
import { Tarefa } from "../types/Tarefa";

export default function TaskItem({ Tarefa }: { Tarefa: Tarefa }) {
    return(
        <View style={styles.container}>
            <View style={[styles.checkbox, Tarefa.completa && styles.checked]} />
            <Text style={[styles.text, Tarefa.completa && styles.completedText]}>{Tarefa.titulo}</Text>
        </View>
    );
}   

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
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
    fontSize: 16
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#999'
  }
});