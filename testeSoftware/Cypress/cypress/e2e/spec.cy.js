describe('teste de login', () => {
  it('login com sucesso', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="email"]').type('carlos@gmail.com');
    cy.get('[data-testid="senha"]').type('1234');
    cy.get('[data-testid="entrar"]').click();
    cy.get('div:nth-child(1) > div.card-body > div > a[href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]').click();
    cy.get('#root h1').contains('Lista de Compras');
  })
  it.only('login com falha', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="email"]').type('rodrigo@gmail.com');
    cy.get('[data-testid="senha"]').type('1234')
    cy.get('[data-testid="entrar"]').click();
  })
})
