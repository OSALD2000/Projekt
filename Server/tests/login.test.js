import { it, expect, beforeAll, afterAll } from 'vitest';
const app = require('../app');
let server;

beforeAll(()=>{
    server = app.listen(7000);
})


it('login password validation', async () => {
    const userData = {
        email: "1-user@test.de",
        password: "false",
    }
    const response = await fetch("http://localhost:7000/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    })

    const data = await response.json();
    expect(data.message === "Worng password").toBeTruthy();
})


it('login email validation', async () => {
    const userData = {
        email: "222@222.d",
        password: "false",
    }

    const response = await fetch("http://localhost:7000/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    })

    const data = await response.json();
    expect(data.message === "A user with this email could not be found").toBeTruthy();
})



it('login', async () => {
    const userData = {
        email: "1-user@test.de",
        password: "root",
    }

    const response = await fetch("http://localhost:7000/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    })

    const data = await response.json();
    expect(data.token).toBeTruthy();
})




afterAll(async()=>{
    await server.close();
})