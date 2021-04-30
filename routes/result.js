import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import writeData from '../utils/writeJSON';
import updateData from '../services/updateData';

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
            const weatherData = (JSON.parse(data));
            const weatherDescription = (weatherData.weather[0].description);
            const temp = (weatherData.main.temp);
            const feels_like = (weatherData.main.feels_like);
            const temp_min = (weatherData.main.temp_min);
            const temp_max = (weatherData.main.temp_max);
            const visibility = (weatherData.visibility);
            const wind_speed = (weatherData.wind.speed);
            const wind_deg = (weatherData.wind.deg);
            const city_name = weatherData.name;
            
            const obj = new updateData();
            obj.updateData(city_name,weatherDescription,temp,feels_like,temp_min,temp_max,visibility,wind_speed,wind_deg);
            
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