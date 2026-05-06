import { Tarefa } from '../types/Tarefa';

export class TarefaService {

  static adicionarTarefa(tarefas: Tarefa[], titulo: string): Tarefa[] {
    if (!titulo.trim()) {
      throw new Error('Título da tarefa não pode estar vazio');
    }

    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      completa: false,
    };

    return [...tarefas, novaTarefa];
  }

  static removerTarefa(tarefas: Tarefa[], id: string): Tarefa[] {
    return tarefas.filter((tarefa) => tarefa.id !== id);
  }

  static alternarStatusTarefa(tarefas: Tarefa[], id: string): Tarefa[] {
    return tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, completa: !tarefa.completa } : tarefa
    );
  }

  static filtrarTarefas(tarefas: Tarefa[], filtro: 'todos' | 'concluidas' | 'pendentes'): Tarefa[] {
    switch (filtro) {
      case 'concluidas':
        return tarefas.filter((tarefa) => tarefa.completa);
      case 'pendentes':
        return tarefas.filter((tarefa) => !tarefa.completa);
      case 'todos':
      default:
        return tarefas;
    }
  }

  static contarTarefasCompletas(tarefas: Tarefa[]): number {
    return tarefas.filter((tarefa) => tarefa.completa).length;
  }

  static obterEstatisticas(tarefas: Tarefa[]) {
    return {
      total: tarefas.length,
      completas: this.contarTarefasCompletas(tarefas),
      pendentes: tarefas.length - this.contarTarefasCompletas(tarefas),
    };
  }
}
