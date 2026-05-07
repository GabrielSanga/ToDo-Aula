import * as SQLite from 'expo-sqlite';

export const database = SQLite.openDatabaseSync("ToDo.db");

export function inicializarBancoDeDados(){
    database.execSync(`CREATE TABLE IF NOT EXISTS tarefas (
                           id INTEGER PRIMARY KEY, 
                           titulo TEXT, 
                           completa INTEGER
                        );`);
}