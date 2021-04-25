import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';

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

module.exports = router;