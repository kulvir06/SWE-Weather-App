import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import http from 'http';
import writeData from '../utils/writeJSON';
import updateData from '../services/updateData';
const ejs = require("ejs");


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/', (req,res) => {
     res.sendFile('C:/Users/Gurtavrein Singh/Desktop/SWE-Weather-App-master/public/searchResultIP.html');
});
let weatherData,weatherDescription,temp,feels_like,temp_max,temp_min,wind_deg,wind_speed,city_name,visibility;
router.post('/view', (req,res) => {
    let str = '';
    const url = "https://api.ipify.org/?format=json";
    https.get(url, (response) => {
        response.on('data', (data) => {
            const ipExtractor = JSON.parse(data);
            const ip = ipExtractor.ip ;
            console.log(ip);
            //finding the loction from IP

            const url1 = "http://api.ipstack.com/"+ip+"?access_key=d63885d65d40d9890b3c98299484f815";
            const callback = (response) => {
                response.on('data', (chunk) => {
                    str += chunk;
                });

                response.on('end', () => {
                    const location = JSON.parse(str);
                    const city = location.city;
                    // console.log(location);
                    // console.log(city);
                    //get weather
                    const url2 = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=9a16b2394635fc4be13840339c228137&units=metric';
                    https.get(url2, (response) => {
                        response.on('data', (data) => {
                            const weatherData = (JSON.parse(data));
                            const code = weatherData.cod;
                            if (code!=404){
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
                                res.redirect("/result_ip/resultip");
                            }
                            else{
                                res.send('error');
                            }

                        });        
                    });

                });
            }
            let request = http.request(url1, callback).end();
        });        
    });
})

router.get('/resultip',function(req,res){
    res.render("../ejs/result",{city:city_name,temp:temp,feels_like:feels_like,temp_min:temp_min,temp_max:temp_max,visibility:visibility,winds:wind_speed,windd:wind_deg,wd:weatherDescription});
});


router.post('/downloads/JSON', (req,res) => {
    let str = '';
    const url = "https://api.ipify.org/?format=json";
    https.get(url, (response) => {
        response.on('data', (data) => {
            const ipExtractor = JSON.parse(data);
            const ip = ipExtractor.ip ;
            console.log(ip);
            //finding the loction from IP

            const url1 = "http://api.ipstack.com/"+ip+"?access_key=d63885d65d40d9890b3c98299484f815";
            const callback = (response) => {
                response.on('data', (chunk) => {
                    str += chunk;
                });

                response.on('end', () => {
                    const location = JSON.parse(str);
                    const city = location.city;
                    
                    //get weather
                    const url2 = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=9a16b2394635fc4be13840339c228137&units=metric';
                    https.get(url2, (response) => {
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
                                res.download('C:/Users/Gurtavrein Singh/Desktop/SWE-Weather-App-master/json.txt');
                            }
                
                            asyncCall(data);          
                            //
                        });        
                    });

                });
            }
            let request = http.request(url1, callback).end();
        });        
    });
})



module.exports = router;
