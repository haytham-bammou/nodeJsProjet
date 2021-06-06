'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = new Array();
    let role = ['author' , 'admin' , 'guest']
    for (let i = 0; i <20 ; i++) {
      let time = faker.datatype.datetime()
      let updateTime = faker.datatype.datetime()
      let ob = {
        username: faker.name.firstName() +'_'+ faker.name.lastName(), 
        email: faker.internet.email(),
        password : faker.internet.password(),
        role: role[i%3],
        createdAt: time,
        updatedAt: time < updateTime ? updateTime : time 
    
      }
      users.push(ob);
    }
    return queryInterface.bulkInsert('Users',users, {});

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
     
  }
};
