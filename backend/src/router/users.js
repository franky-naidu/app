const { Router} = require("express")
const { getUsers,creatNewUser} = require("../service/users")
const routes =  Router();

routes.get("/", (req,res) => {
    // getUsers(req,res)
    
    console.log(req.body)
    // creatNewUser(req,{email:"frankyda@buffalo.edu"})
})

routes.post("/", async (req,res) => {
    // res.json(req.body)
    console.log(req.body)
    result = await creatNewUser(req,req.body)
    res.json(result)
})

module.exports = routes