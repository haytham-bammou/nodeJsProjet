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
    await queryInterface.bulkInsert('Users',users, {});
    let tags = new Array();
    for(let i = 0 ; i<10 ; i++) {
      let time = faker.datatype.datetime();
      let updateTime = faker.datatype.datetime()
      let obT = {
        name : faker.lorem.word() +' '+faker.lorem.word() + ' ' + faker.lorem.word(),
        createdAt: time,
        updatedAt : time < updateTime ? updateTime : time
      }
      tags.push(obT);
    }
    await queryInterface.bulkInsert('Tags',tags,{});

    let article = new Array();
    let comment = new Array();
    let tag = new Array();
    let ARTID = 0
    for(let i = 0 ; i<20 ; i++) {
      let nbreArticle = Math.floor(Math.random()*9 + 2)
      for(let j = 0 ; j<nbreArticle; j++) { // chaque utilisateur a entre 10 et 2 article 
        ARTID ++;
        let objAr = {
          title : faker.lorem.words(),
          content : faker.lorem.paragraph(),
          published : true,
          createdAt : new Date(),
          updatedAt : new Date(),
          userId : i+1
        }
        let nbreTag = Math.floor(Math.random()*5 + 2) 
        let TagArry = []
        for(let index = 0 ; index <nbreTag; index++) { // chaque article a entre 2 et 6 tags 
          let T = Math.floor(Math.random()*10 +1);
          while(TagArry.includes(T)){
            T = Math.floor(Math.random()*10 +1)
          }
          TagArry.push(T)
          let objTag = {
            createdAt : new Date(),
            updatedAt : new Date(),
            ArticleId : ARTID ,
            TagId :T,
          }
          tag.push(objTag)
        }
        let nbreCom = Math.floor(Math.random()*11)
        for(let n = 0 ; n<nbreCom ; n++){ // chaque article a entre 0 et 11 comentaire 
          let objC = {
            content : faker.lorem.paragraph(),
            createdAt : new Date(),
            updatedAt : new Date(),
            ArticleId : j+1,
            UserId : i+1
          }
          comment.push(objC);
        }
        article.push(objAr);
      }
    }
    await queryInterface.bulkInsert('Articles',article,{});
    await queryInterface.bulkInsert('Comments',comment, {});
    await queryInterface.bulkInsert('ArticleTags',tag,{});
    // console.log(tag);
  },

  down : async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
     
  }
};
