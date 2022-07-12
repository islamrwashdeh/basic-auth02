'use strict';
const { app } = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);
const { db } = require('../src/auth/models/index');
const { beforeAll, afterAll, it, expect } = require('@jest/globals');

beforeAll(async ()=>{
    await db.sync();
})
afterAll(async ()=>{
    await db.drop();
})


describe('Web error', () => {
    it('404 response', async () => {
        const response = await request.get('/Wrong Path');
        expect(response.status).toBe(404);
    });
})

describe('basic Auth',()=>{
    it('signup',async ()=>{
        const response = await request.post('/signup').send({
            username:"islam",
            password: "1234"
        });
        expect(response.status).toBe(201);
    });
    it('signin',async ()=>{
        const response = await request.post('/signin').auth("islam","1234");
        expect(response.status).toBe(200);
    });
    //403 status for wrong input
    it('sign in with wrong password',async ()=>{
        const response = await  request.post('/signin').auth('islam','gsfgsf');
        expect(response.status).toBe(403)
    })
    it('sign in with wrong username',async ()=>{
        const response = await  request.post('/signin').auth('isssl','1234');
        expect(response.status).toBe(403)
    })
})