import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import http from 'http';
import writeData from '../utils/writeJSON';
import updateData from '../services/updateData';


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/', (req,res) => {
     res.sendFile('C:/Users/kulvir/Desktop/DEV/SWE/public/searchResultIP.html');
});

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
                    
                    //get weather
                    const url2 = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=9a16b2394635fc4be13840339c228137&units=metric';
                    https.get(url2, (response) => {
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
            }
            let request = http.request(url1, callback).end();
        });        
    });
})

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
                                res.download('C:/Users/kulvir/Desktop/DEV/SWE/json.txt');
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