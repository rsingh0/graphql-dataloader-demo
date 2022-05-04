export default {
  Recipe: {
    ingredients: ({ id }, args, { models }) =>
      models.Ingredient.findAll({
        where: {
          recipeid: id,
        },
      }),
  },
  RecipeDataLoader: {
    ingredientsDataLoader: ({ id }, args, { models, ingredientLoader }) =>
      ingredientLoader.load(id),
  },
  Query: {
    recipies: (parent, args, { models }) => models.Recipe.findAll(),
    recipiesByDataLoader: (parent, args, { models }) => models.Recipe.findAll(),
  },
};
