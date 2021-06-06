const router = require('express').Router();
const UserRepo = require('../repositories/users');
router.get('/' , async function (req, res,next) {
    res.send(await UserRepo.getAllUsers());
})

router.get('/:id' , async function (req, res, next) { 
    const member = await UserRepo.getUser(req.params.id);
    if(member.length) res.send(member);
    else res.status(400).json({msg:'no req.body with this id '})

})
router.put('/:id', async function (req, res, next) {
    const user = await UserRepo.getUser(req.params.id);
    const mem = {id : req.params.id}
    if(!user.length) res.status(400).json({msg:'no members with this id'});
    else {
        mem.username = req.body.username? req.body.username : user[0].dataValues.username ;
        mem.email = req.body.email ? req.body.email : user[0].dataValues.email ;
        mem.password = req.body.password ? req.body.password : user[0].dataValues.password ;
        mem.role = req.body.role ? req.body.role : user[0].dataValues.role ;
        mem.createdAt = req.body.createdAt ? req.body.createdAt : user[0].dataValues.createdAt;
        mem.updatedAt = new Date();
        UserRepo.deleteUser(req.params.id)
        UserRepo.addUser(mem);
        res.json({msg : 'user updated successfully ' , mem});
    }
})

module.exports = router;