module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Data', {
        city: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        temp: {
            type: DataTypes.STRING
        },
        feels_like: {
            type: DataTypes.STRING
        },
        temp_min: {
            type: DataTypes.STRING
        },
        temp_max: {
            type: DataTypes.STRING
        },
        visibility: {
            type: DataTypes.STRING
        },
        wind_speed: {
            type: DataTypes.STRING
        },
        wind_deg: {
            type: DataTypes.STRING
        },
                
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        freezeTableName: true
    }); 
    return User;
};