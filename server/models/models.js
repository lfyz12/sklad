const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Таблица пользователей
const User = sequelize.define('User', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Fullname: { type: DataTypes.STRING(50), allowNull: false },
    Password: { type: DataTypes.STRING(255), allowNull: false },
    Email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    IsAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }, // Признак администратора
});

const Product = sequelize.define('Product', {
    Id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    Name: {type: DataTypes.STRING, allowNull: false},
    Quantity: {type: DataTypes.INTEGER, allowNull: false},
    Description: { type: DataTypes.STRING, allowNull: false },
    Price: { type: DataTypes.STRING, allowNull: false },
    CreateDate: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    UpdateDate: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW}
})

const Agent = sequelize.define('Agent', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Type: { type: DataTypes.STRING, allowNull: false },
    CreateDate: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    UpdateDate: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW}
})

const Document = sequelize.define('Document', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    CreateDate: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    UpdateDate: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    AgentId: {type: DataTypes.INTEGER, allowNull: false},
    Type: { type: DataTypes.STRING, allowNull: false },
    Active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

const DocumentDetails = sequelize.define('DocumentDetails', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    DocumentId: {type: DataTypes.INTEGER, allowNull: false},
    ProductId: {type: DataTypes.UUID, allowNull: false},
    Quantity: {type: DataTypes.INTEGER, allowNull: false},
    Price: { type: DataTypes.STRING, allowNull: false },
    Cost: { type: DataTypes.STRING, allowNull: false }
})

Product.hasMany(DocumentDetails);
DocumentDetails.belongsTo(Product);

Document.belongsTo(Agent);
Agent.hasMany(Document);

Document.hasMany(DocumentDetails)
DocumentDetails.belongsTo(Document)

module.exports = {
    User,
    Product,
    Agent,
    Document,
    DocumentDetails
};