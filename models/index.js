import Sequelize from 'sequelize';
import recipeModel from './recipe.js'
import ingredientModel from './ingredient.js'

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'Jackson@123',
  {
    host: 'localhost',
    dialect: 'postgres',
  },
);

const db = {
  Recipe: recipeModel(sequelize, Sequelize.DataTypes),
  Ingredient: ingredientModel(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
