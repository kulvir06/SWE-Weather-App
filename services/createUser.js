  
import db from '../utils/db';

class create{
    addUser(email, name, password){
        const flag = async() => {
            let validation = 1;
            const newUser = await db.user.create({
                email,
                name,
                password
            })
             .catch((err) => {console.log(err); validation=0;})
            return validation;
        }
        const res = flag();  
        return res;    
    }
}

module.exports = create ;