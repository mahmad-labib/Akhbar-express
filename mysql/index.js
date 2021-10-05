const Sequelize = require('sequelize');
const userModel = require('./models/user-model');
const roleModel = require('./models/role-model');
const conf = require('../conf/default');

// Option 1: Passing a connection URI
const sequelize = new Sequelize(conf.database.DATABASE,
    conf.database.USERNAME,
    conf.database.PASSWORD, {
        host: conf.database.HOST,
        dialect: 'mysql'
    });

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//  USE MODELS
const User = userModel(sequelize, Sequelize);
const Role = roleModel(sequelize, Sequelize);

//   Pivot Tables
//   USERS_ROLES Pivot Table
const users_roles = sequelize.define('users_roles', {
    // Model attributes are defined here
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    modelName: 'users_roles'
});

//  ------ Relations ------

// USERS_ROLES Relation
User.belongsToMany(Role, {
    through: users_roles
});
Role.belongsToMany(User, {
    through: users_roles
});

// through is required!

try {
    sequelize.sync();
} catch (err) {
    console.log(err);
}

module.exports = User, Role