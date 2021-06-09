const { User , Article , Comment } = require("../models");
console.log(User.findAll());
module.exports = {
  getAllUsers() {
    return User.findAll();
  },
  // method to implement
  getUsers(offset = 0, limit = 10) {
    return User.findAll({
      offset: offset,
      limit: limit,
    });
  },
  getAdmins() {
    return User.findAll({
      where: { role: "admin" },
    });
  },

  getAuthors() {
    return User.findAll({
      where: { role: "author" },
    });
  },
  getGuests() {
    return User.findAll({
      where: { role: "guest" },
    });
  },
  getUser(id) {
    return User.findAll({
      where: { id: id },
    });
  },
  getUserByEmail(email) {
    return User.findAll({
      where: { email: email },
    });
  },
  addUser(user) {
    const newUser = User.build(user)
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    newUser.save();
  },
  updateUser() {}, 
  deleteUser(id) {
    User.destroy({where: { id: id}})
  },
  getArticles(id){
    return Article.findAll({
      where : { UserId: id},
    })
  },
  addArticle(article){
    const newArticle = Article.build(article);
    newArticle.createdAt = new Date();
    newArticle.updatedAt = new Date();
    newArticle.save();
  },
  getArticlesComment(id){
    return Comment.findAll({
      where : { ArticleId: id}
    })
  },

};
