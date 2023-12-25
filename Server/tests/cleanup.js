const sequelize = require("../util/db");
const create_users = require('../tester_util/create_users');
const User = require('../module/auth/user');
const app = require('../app');

sequelize.sync({ force: true }).then(()=>{
}).catch(error => console.log(error))
