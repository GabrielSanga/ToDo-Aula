import { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Create() {
  const [titulo, setTitulo] = useState('');
  const router = useRouter();

  function salvarTarefa() {
    router.replace({ pathname: '/', params: { novoTitulo: titulo } });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar tarefa</Text>
        <Text style={styles.subtitle}>Escreva a tarefa que deseja adicionar.</Text>

        <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput placeholder="Digite a tarefa..." value={titulo} onChangeText={setTitulo} style={styles.input} placeholderTextColor="#9ca3af" returnKeyType="done" onSubmitEditing={salvarTarefa} />

          <TouchableOpacity style={styles.saveButton} onPress={salvarTarefa}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5b21b6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 24,
  },
  form: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#ddd6fe',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#5b21b6',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#8b5cf6',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#5b21b6',
    fontWeight: '700',
    fontSize: 16,
  },
});
