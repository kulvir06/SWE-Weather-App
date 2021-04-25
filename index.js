import express from 'express';
import database from './utils/db';
import user from './routes/user';
import login from './routes/login';
import result from './routes/result';

const app = express();

const exe  = async() => {
    await database.sequelize.sync();
}
exe();


app.use('/result',result);
app.use('/user',user);
app.use('/login',login)

app.get('/', (req, res) => { res.sendFile('C:/Users/kulvir/Desktop/DEV/SWE/public/landingpage.html'); })

app.listen(3000, ()=> { console.log('server running on port 3000'); });