import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import writeData from '../utils/writeJSON';
import updateData from '../services/updateData';
//import ejs from 'ejs';
const ejs = require("ejs");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))
// router.set('view engine', 'ejs');

// router.engine('html', require('ejs').renderFile);
// router.set('view engine', 'html');

let city,weatherData,weatherDescription,temp,feels_like,temp_max,temp_min,wind_deg,wind_speed,city_name,visibility;

router.post('/', (req,res) => {
    city = req.body.city;
    res.sendFile('C:/Users/kulvir/Desktop/DEV/SWE/public/serachResult.html');
});

router.post('/view', (req, res) => {    
    console.log(city);
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=9a16b2394635fc4be13840339c228137&units=metric';
    https.get(url, (response) => {
        response.on('data', (data) => {
             weatherData = (JSON.parse(data));
             weatherDescription = (weatherData.weather[0].description);
             temp = (weatherData.main.temp);
             feels_like = (weatherData.main.feels_like);
             temp_min = (weatherData.main.temp_min);
             temp_max = (weatherData.main.temp_max);
             visibility = (weatherData.visibility);
             wind_speed = (weatherData.wind.speed);
             wind_deg = (weatherData.wind.deg);
             city_name = weatherData.name;
            
            const obj = new updateData();
            obj.updateData(city_name,weatherDescription,temp,feels_like,temp_min,temp_max,visibility,wind_speed,wind_deg);
            res.redirect("/result/results");
            //res.render("../ejs/result",{city:city_name,temp:temp,feels_like:feels_like,temp_min:temp_min,temp_max:temp_max,visibility:visibility,winds:wind_speed,windd:wind_deg});
             
        });        
    });
});

router.get('/results',function(req,res){
    res.render("../ejs/result",{city:city_name,temp:temp,feels_like:feels_like,temp_min:temp_min,temp_max:temp_max,visibility:visibility,winds:wind_speed,windd:wind_deg,wd:weatherDescription});
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