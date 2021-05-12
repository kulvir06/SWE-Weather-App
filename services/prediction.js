
const dataExtractor = (string_data) => {
    const data = JSON.parse(string_data);
    return listData(data.list);
    // return data;
    
}


const listData = (data) => {
    let weatherDescription,temp=0,feels_like=0,temp_max=0,temp_min=0,visibility=0,wind_speed=0,wind_deg=0;
    data.forEach(element => {
        temp += Number(element.main.temp);
        feels_like += Number(element.main.feels_like);
        temp_min += Number(element.main.temp_min);
        temp_max += Number(element.main.temp_max);
        visibility += Number(element.visibility);
        wind_speed += Number(element.wind.speed);
        wind_deg += Number(element.wind.deg);                                
    });
    weatherDescription = data[0].weather[0].description;  

    const predictedResult = {
        temp: temp/40,
        feels_like: feels_like/40,
        temp_min: temp_min/40,
        temp_max: temp_max/40,
        visibility: visibility/40,
        wind_speed: wind_speed/40,
        wind_deg: wind_deg/40,
        weatherDescription: weatherDescription
    };
    return predictedResult;
}

module.exports = dataExtractor;