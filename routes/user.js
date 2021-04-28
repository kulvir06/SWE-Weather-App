import express from 'express';
import createUser from '../services/createUser';
import bodyParser from 'body-parser';
import hashPassword from '../services/hash';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

let email, name, password;

router.get("/", (req,res) => {
    res.sendFile("C:/Users/kulvir/Desktop/DEV/SWE/public/createuser.html")


});

router.post("/new", async(req,res) => {
    email = req.body.email;
    name = req.body.name;
    password = await hashPassword(req.body.password);
    const obj = new createUser();
    const flag = await obj.addUser(email, name, password);  
    if(flag === 0) res.sendFile('C:/Users/kulvir/Desktop/DEV/SWE/public/error_create_user.html');
    else res.sendFile('C:/Users/kulvir/Desktop/DEV/SWE/public/home.html');  
});

module.exports = router ;