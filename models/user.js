module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        freezeTableName: true
    }); 
    return User;
};