export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    name: DataTypes.STRING,
  });

  Recipe.associate = (models) => {
    // 1 to many with recipe
    Recipe.hasMany(models.Ingredient, {
      foreignKey: 'recipeid',
    });
  };

  return Recipe;
};
