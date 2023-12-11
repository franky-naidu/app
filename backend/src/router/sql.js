const { Router} = require("express")
const { runSql} = require("../service/sql")
const routes =  Router();


routes.post("/", async (req,res) => {
    // console.log(JSON.parse(req.body))
    // res.json(req.body.query)
    // console.log(JSON.parse(req.body))
    result = await runSql(req.body.query)
    res.json(result)
})

module.exports = routes


