import express, { response } from 'express';
import bodyParser from 'body-parser';
import https from 'https';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

let city ;

router.post('/', (req,res) => {
    city = req.body.city;

    const url = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=9a16b2394635fc4be13840339c228137';
    const request = https.request(url, (response) => {
        const chunks = [];
    
        response.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        response.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
            res.send(body.toString());
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

module.exports = router;