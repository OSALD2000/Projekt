const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const create_5000_user = async (User) => {
    try {
        const hashedPw = await bcrypt.hash("root", 12);
        for (let index = 0; index <= 5000; index++) {
            const email = `${index}-user@test.de`
            const username = `${index}-user` 
            User.create({
                _id: uuid.v4(),
                email: email,
                password: hashedPw,
                username: username,
                emailverified: true,
                roll: null
            });
        }
    } catch (e) {
        console.log("users not created");
    }
}

module.exports = create_5000_user;