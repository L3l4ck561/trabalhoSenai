const { createUser, getUserById, updateUser, deleteUser, resetUsers } = require('./userService')

test('verifica se resetou o BD', () => {
    expect(resetUsers()).toBeTruthy()
})

// limpar os dados antes de cada teste
beforeEach(()=>{
    resetUsers()
})

test('criando um novo usuário', () => {
    const user = { id: 4, nome: 'zezão' }
    expect(createUser(user)).toEqual(user)
});

//Buscar usuário por id;
test('verificando usuário pelo id', () => {
    const user = { id: 4, nome: 'zezão' }
    createUser(user)
    expect(getUserById(4)).toEqual(user)
});

//Atualizar user existente;
test('verifica se houve update', () => {
    const user = { id: 3, nome:'zezão'}
    createUser(user)
    const upUser = updateUser(3,{nome:'bobão'})
    expect(upUser.nome).toBe('bobão')
})

//remover usuário existente;
test('verifica se elemento foi deletado', () => {
    const user = { id: 3, nome:'zezão'}
    createUser(user)
    expect(deleteUser(3)).toBeTruthy()
})

//tentar atualizar usuário inexistente
test('verifica se atualizar usuário inexistente', () => {
    expect(updateUser(3,{nome:'bobão'})).toBeFalsy()
})

//tentar deletar usuário inexistente
test('verifica se deletar usuário inexistente', () => {
    expect(deleteUser(12345673)).toBeFalsy()
})