import express from 'express';
import database from './utils/db';
import user from './routes/user';
import login from './routes/login';
import result from './routes/result';
import result_ip from './routes/result_ip';
import downloads_data_set from './routes/downloads_data_set';
import predict_weather from './routes/predict_weather';

const app = express();

const exe  = async() => {
    await database.sequelize.sync();
}
exe();


app.use('/result',result);
app.use('/user',user);
app.use('/login',login);
app.use('/result_ip',result_ip);
app.use('/prediction',predict_weather);
app.use('/downloads/data_set',downloads_data_set);

app.get('/', (req, res) => { res.sendFile('C:/Users/kulvir/Desktop/DEV/SWE/public/landingpage.html'); })

app.listen(3000, ()=> { console.log('\n***********\nserver running on port 3000!!\n***********\n'); });