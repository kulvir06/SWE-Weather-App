module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Data', {
        city: {
            type: DataTypes.String
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        freezeTableName: true
    }); 
    return User;
};