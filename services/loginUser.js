  
import db from '../utils/db';

class login{
    loginUser(email, password){        
        const flag = async() => {
            const searchUser = await db.user.findAll({
                where: { email, password }                   
            });
            
            if(searchUser.length === 0) return 0 ;
            else return 1;
        }
        const res = flag();  
        return res;    

    }
}

module.exports = login ;