
import db from '../utils/db';

class getDatafromDB{
    getData(){        
        const flag = async() => {
            let arr = [];
            const searchUser = await db.data.findAll();   
            searchUser.forEach((user) => {
                arr.push(user.dataValues);
            });
            return arr;
        } 
        return flag();       
        
    }
}

module.exports = getDatafromDB ;