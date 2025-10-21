const request = require('supertest')
const app = require('./app')

beforeEach(() => {
    app.request
})

test('criar usuario', async () => {
    const res = await request(app).post('/users').send({ id: 4, name: 'Fábio' })
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Fábio");
})

test('buscar usuário', async () => {
    const res = (await request(app).get(`/users/4`));
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Fábio');
});

test('usuário inexistente', async () => {
    const res = (await request(app).get(`/users/3`));
    expect(res.statusCode).toBe(404);
});

test('atualizando usuário existente', async () => {
    const res = (await request(app).put(`/users/4`).send({name: 'Rodrigo' }));
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Rodrigo');
});

test('deletando usuário existente', async () => {
    const res = (await request(app).delete(`/users/4`));
    expect(res.statusCode).toBe(204);
});
