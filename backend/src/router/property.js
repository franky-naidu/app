const { Router} = require("express")
const { createProperty,addServicesToProperty} = require("../service/property")
const routes =  Router();



routes.post("/", async (req,res) => {
    // res.json(req.body)
    console.log(req.body)
    result = await createProperty(req,req.body)
    res.json(result)
})

routes.post("/services", async(req,res) => {
    body = req.body
    result = await addServicesToProperty()
})

module.exports = routes