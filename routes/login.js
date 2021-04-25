import express from 'express';
import loginUser from '../services/loginUser';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

let email, password;

router.get("/", (req,res) => {
    res.sendFile("/login.html", {root: "C:/Users/kulvir/Desktop/DEV/SWE/public"});
    
});

router.post("/", async (req,res) => {
    email = req.body.email;
    password = req.body.password;
    const obj = new loginUser();
    const flag = await obj.loginUser(email, password);
    if(flag === 0) res.send('err');
    else res.sendFile("C:/Users/kulvir/Desktop/DEV/SWE/public/home.html");
});



module.exports = router ;