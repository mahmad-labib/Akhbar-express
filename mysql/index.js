const {
  Sequelize,
  DataTypes,
  NUMBER,
  STRING
} = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('test', 'adam', '01030', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const users = sequelize.define('users', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  modelName: 'users'
});

const roles = sequelize.define('roles', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  modelName: 'roles'
});

const users_roles = sequelize.define('users_roles', {
  // Model attributes are defined here
  user_id: {
    type: STRING,
    allowNull: false
  },
  role_id: {
    type: STRING,
    allowNull: false
  },
}, {
  modelName: 'users_roles'
});


users.belongsToMany(roles, {
  through: users_roles
});
roles.belongsToMany(users, {
  through: users_roles
});


// through is required!

// try {
//   sequelize.sync();
// } catch (err) {
//   console.log(err);
// }

const new_user = users.create({
  name: "admin",
  password: 1234
});

// `sequelize.define` also returns the model
console.log(users === sequelize.models.users);