import checkHashPassword from '../services/checkHash';
import db from '../utils/db';

class login{
    loginUser(email, password){        
        const flag = async() => {
            
            const searchUser = await db.user.findAll({
                where: { email }                   
            });
            

            if(searchUser.length === 0) return 0 ;
            else {
                const hashData = ((searchUser[0].dataValues.password));
                const checkPassword = checkHashPassword(password, hashData);
                if(checkPassword) return 1;
                else return 0;
            }
        }
        const res = flag();  
        return res;    

    }
}

module.exports = login ;