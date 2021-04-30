import express from 'express';
import getData from '../services/getData';
import json2xls from '../utils/json2xls';

const router = express.Router();

router.post("/", (req,res) => {
    
    function resolveAfter2seconds() {
        return new Promise(resolve => {
            const obj = new getData();
            const interact = obj.getData();
            setTimeout(() => {
                resolve(interact);                
            }, 2000);
        });                
    }

    async function asyncCall() { 
        const arr = await resolveAfter2seconds();
        arr.forEach(element => {
            json2xls(element);
        });
        
    }

    asyncCall();  

});

module.exports = router;
