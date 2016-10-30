var path     = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env      = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app : {
      name: 'super-site'
    },
    port: process.env.PORT || 3000,
    db  : process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/dev'
  },

  test: {
    root: rootPath,
    app : {
      name: 'super-site'
    },
    port: process.env.PORT || 3000,
    db  : 'postgres://admin:admin@localhost:5432/dev'
  },

  production: {
    root: rootPath,
    app : {
      name: 'super-site'
    },
    port: process.env.PORT || 3000,
    db  : 'postgres://admin:admin@localhost:5432/dev'
  }
};

module.exports = config[env];
