import express, { response } from 'express';
import bodyParser from 'body-parser';
import https from 'https';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

let city ;

router.post('/', (req,res) => {
    city = req.body.city;

    const url = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=9a16b2394635fc4be13840339c228137';
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = (JSON.parse(data));
            res.send(weatherData);
        })
    })
    
})

module.exports = router;