import { Tarefa } from '../types/Tarefa';
import { TarefaRepository } from '../database/TarefaRepository';

export class TarefaService {

  static buscarTodas(): Tarefa[] {
    return TarefaRepository.buscar();
  }

  static adicionarTarefa(tarefas: Tarefa[], titulo: string): Tarefa[] {
    if (!titulo.trim()) {
      throw new Error('Título da tarefa não pode estar vazio');
    }

    const novaTarefa = TarefaRepository.adicionar(titulo.trim(), false);

    return [...tarefas, novaTarefa];
  }

  static removerTarefa(tarefas: Tarefa[], id: number): Tarefa[] {
    TarefaRepository.remover(id);
    return tarefas.filter((tarefa) => tarefa.id !== id);
  }

  static alternarStatusTarefa(tarefas: Tarefa[], id: number): Tarefa[] {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, completa: !tarefa.completa } : tarefa
    );
    const tarefaAtualizada = novasTarefas.find(t => t.id === id);
    if (tarefaAtualizada) {
      TarefaRepository.atualizarConfirma(id, tarefaAtualizada.completa);
    }
    return novasTarefas;
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
