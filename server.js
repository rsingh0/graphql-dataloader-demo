import { ApolloServer } from "apollo-server";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import models from "./models/index.js";
import DataLoader from "dataloader";
import _ from "lodash"

const recipeIngredients = async (keys, { Ingredient }) => {

  // keys = [1, 2, 3 ..., 13]
  const ingredients = await Ingredient.findAll({
    raw: true,
    where: {
      recipeid: keys,
    },
  });
  // ingredient = [{text:'Muttar', recipeId: 1}, {text:'Paneer', recipeId: 1}, {text:'Aloo', recipeId: 2}, {text:'Puri', recipeId: 2}]
  const ingredientGroupedBy = _.groupBy(ingredients, "recipeid");
  // ingredientGroupedBy = {1: [{text:'Muttar', recipeId: 1}, {text:'Paneer', recipeId: 1}], 2: [{text:'Aloo', recipeId: 2}, {text:'Puri', recipeId: 2}]}
  
  // console.log(ingredientGroupedBy)
  return keys.map((k) => ingredientGroupedBy[k] || []);
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    models,
    ingredientLoader: new DataLoader((keys) => recipeIngredients(keys, models)),
  }),
});

models.sequelize.sync().then(() =>
  server.listen(5000, () => {
    console.log("Apollo Server started at http://localhost:3000");
  })
);
