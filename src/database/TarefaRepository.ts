import { Tarefa } from '../types/Tarefa';
import { database } from './Database';

export const TarefaRepository = {
    buscar(): Tarefa[] {
        const tarefas = database.getAllSync<any>('SELECT * FROM tarefas');

        return tarefas.map((tarefa) => ({
            id: tarefa.id,
            titulo: tarefa.titulo,
            completa: tarefa.completa === 1,
        }));
    },
    adicionar(titulo: string, completa: boolean = false): Tarefa {
        database.runSync(
            'INSERT INTO tarefas (titulo, completa) VALUES (?, ?)',
            [titulo, completa ? 1 : 0]
        );
        const result = database.getFirstSync<{ 'last_insert_rowid()': number }>('SELECT last_insert_rowid() as id');
        const id = result?.['last_insert_rowid()'] || 0;
        return {
            id,
            titulo,
            completa,
        };
    },
    remover(id: number) {
        database.runSync('DELETE FROM tarefas WHERE id = ?', [id]);
    },
    atualizarConfirma(id: number, completa: boolean) {
        database.runSync('UPDATE tarefas SET completa = ? WHERE id = ?', [completa ? 1 : 0, id]);
    }
};