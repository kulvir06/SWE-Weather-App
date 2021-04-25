import express from 'express';
import createUser from '../services/createUser';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

let email, name, password;

router.get("/", (req,res) => {
    res.sendFile("C:/Users/kulvir/Desktop/DEV/SWE/public/createuser.html")


});

router.post("/new", async(req,res) => {
    email = req.body.email;
    name = req.body.name;
    password = req.body.password;
    const obj = new createUser();
    const flag = await obj.addUser(email, name, password);  
    if(flag === 0) res.send('err');
    else res.send('welcome');  
});

module.exports = router ;