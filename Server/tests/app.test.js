import { it, expect, beforeAll, afterAll } from 'vitest';
const sequelize = require("../util/db");
const User = require("../module/auth/user");
const app = require('../app');

let server;
beforeAll(()=>{
    server = app.listen(7001);
})


it("Database connection set", async () => {
    expect(sequelize.isDefined).toBeTruthy();
})

it("ctreate and delete in Datebase", async () => {
    try {
        const user = await User.create({
            _id: "test12345",
            email: "unittest@test.de",
            password: "test",
            username: "osama",
            emailverified: true,
            roll: null
        });
        await user.destroy();
    } catch (err) {
        err.message = 'can not ctreate and delete in Datebase';
        throw err;
    }
})


it("query in Datebase", async () => {
    try {
        await User.create({
            _id: "testQuery",
            email: "testQuery@test.de",
            password: "test",
            username: "osama",
            emailverified: true,
            roll: null
        });
        const user = await User.findByPk("testQuery");

        expect(user.getDataValue('_id')).toBe('testQuery');
        expect(user.getDataValue('email')).toBe('testQuery@test.de');
        expect(user.getDataValue('username')).toBe('osama');

        await user.destroy();
    } catch (err) {
        err.message = 'can not query in Datebase';
        throw err;
    }
})


it('request handling', async () =>{
    const response = await fetch("http://localhost:7001/loader/categorys");
    const {categotys} = await response.json();

    expect(Array.isArray(categotys)).toBeTruthy();
});

afterAll(async()=>{
    await server.close();
})