// Importando a biblioteca SQLite.
import * as SQLite from 'expo-sqlite';

// Esta linha cria, se não existir, uma base de dados chamada 'users'.
const db = SQLite.openDatabaseSync('users') // openDatabaseSync - Ele é sincrono, isso quer dizer que o código (SQL) espera que a base de dados esteja sempre pronta antes de continuar.

// Criamos esta função para que seja posível chamar a sua execução em outros arquivos, ou seja, do front-end por exemplo.
export function setupUserDatabase() {
    // O db.execSync() - Executa um ou mais comandos SQL que não retornam dados ( DROP, DELETE, CREATE, entre outros).
    db.execSync (
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, cpf TEXT);'
    )
}

// Carrega os usuários cadastrados na base de dados.
export function getUsers() {
    try {
        return db.getAllSync ('SElECT * FROM users;')
    } catch (error) {
        alert('Ocorreu algum erro ao buscar os usuários. Tente novamente!')
        console.error(`Erro ao buscar usuários: ${error}`)
        return []
    }
}

// Função para adicionar um novo usuário.
export function addUser (name, cpf) {
    try {
        db.runSync (
            // db.runSync() -  É usado para comandos SQL que modificam ou exibem novos dados ou dados modificados.
            'INSERT INTO users (name, cpf) VALUES (?, ?);', [name, cpf] // O array [name, cpf] serve para substituir os '?'.
        )
    } catch (error) {
        console.error(`Erro ao adicionar usuário: ${error}`)    
    }   
}

// Função para atualizar um usuário existente.
export function updateUser (id, name, cpf) {
    try {
        db.runSync (
            'UPDATE users SET name = ?, cpf = ? WHERE id = ?', [name, cpf, id]
        )
    } catch (error) {
        console.error(`Erro ao atualizar usuário: ${error}`)
    }
}

//Função para deletar um usuário

export function deleteUser (id) {
    try {
        db.runSync('DELETE FROM users WHERE id = ?;', [id])
    } catch (error) {
        console.error(`Erro ao deletar o usuário. ${error}`)
    }
}