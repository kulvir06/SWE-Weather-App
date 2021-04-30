
import db from '../utils/db';

class updateData{
    updateData(city,description,temp,feels_like,temp_min,temp_max,visibility,wind_speed,wind_deg){
        const flag = async() => {
            let validation = 1;
            const newData = await db.data.create({
                city,
                description,
                temp,
                feels_like,
                temp_min,
                temp_max,
                visibility,
                wind_speed,
                wind_deg
            })
             .catch((err) => {console.log(err); validation=0;})
            return validation;
        }
        const res = flag(); 
        return res; 
            
    }
}

module.exports = updateData ;
