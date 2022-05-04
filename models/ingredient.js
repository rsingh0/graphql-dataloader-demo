export default (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    text: DataTypes.STRING,
  });

  return Ingredient;
};
