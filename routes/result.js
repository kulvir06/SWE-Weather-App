import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import writeData from '../utils/writeJSON';


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

let city;

router.post('/', (req,res) => {
    city = req.body.city;
    res.sendFile('C:/Users/kulvir/Desktop/DEV/SWE/public/serachResult.html');
});

router.post('/view', (req, res) => {    
    console.log(city);
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=9a16b2394635fc4be13840339c228137&units=metric';
    https.get(url, (response) => {
        response.on('data', (data) => {
            res.send(JSON.parse(data));
        });        
    });
});

router.post('/downloads/JSON', (req,res) => {
    console.log(city);
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=9a16b2394635fc4be13840339c228137&units=metric';
    https.get(url, (response) => {
        response.on('data', (data) => { 

            function resolveAfter2seconds(x) {
                return new Promise(resolve => {
                    writeData(JSON.parse(x));
                    setTimeout(() => {
                        resolve('resolved');
                    }, 2000);
                });                
            }

            async function asyncCall(x) { 
                await resolveAfter2seconds(x);
                res.download('C:/Users/kulvir/Desktop/DEV/SWE/json.txt');
            }

            asyncCall(data);          
            
        });        
    });
});

module.exports = router;