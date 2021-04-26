import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import http from 'http';


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/', (req, res) => {
    const city = req.body.city;
    console.log(city);
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=9a16b2394635fc4be13840339c228137&units=metric';
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weather = JSON.parse(data);
            res.send(weather);
        });        
    });
});

router.post('/ip_location_weather', (req,res) => {
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
                            const weather = JSON.parse(data);
                            res.send(weather);
                        });        
                    });

                });
            }
            let request = http.request(url1, callback).end();
        });        
    });


})

module.exports = router;