import express, { response } from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import predictResult from '../services/prediction';
import { resolve } from 'path';
const ejs = require("ejs");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

let city,weatherData,weatherDescription,temp,feels_like,temp_max,temp_min,wind_deg,wind_speed,visibility;

router.post('/', (req,res) => {
    city = req.body.city;

    const url = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=metric&appid=9a16b2394635fc4be13840339c228137';
    const request = https.request(url, (response) => {
        const chunks = [];
    
        response.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        response.on("end", function () {
            const body = Buffer.concat(chunks);
            const predictionResultOutput = predictResult(body.toString());
            console.log(predictionResultOutput);
            //redirect
            temp=predictionResultOutput.temp;
            feels_like=predictionResultOutput.feels_like;
            temp_max=predictionResultOutput.temp_max;
            temp_min=predictionResultOutput.temp_min;
            visibility=predictionResultOutput.visibility;
            wind_deg=predictionResultOutput.wind_deg;
            wind_speed=predictionResultOutput.wind_speed;
            weatherDescription=predictionResultOutput.weatherDescription;
            res.redirect("/prediction/presults");
            // res.send(body.toString());
        });
    });
    
    request.end();
    // https.get(url, (response) => {
    //     response.on('data', (data) => {
    //         const weatherData = ((data));
    //         console.log(JSON.parse(weatherData));
    //         // res.send(JSON.parse(data));
    //     })
    // })
    
})

router.get('/presults',function(req,res){
    res.render("../ejs/predictionResult",{city:city,temp:temp,feels_like:feels_like,temp_min:temp_min,temp_max:temp_max,visibility:visibility,winds:wind_speed,windd:wind_deg,wd:weatherDescription});
});

module.exports = router;
