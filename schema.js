export default `  

  type Ingredient {
    id: Int!
    text: String!
  }

  type Recipe {
    id: Int!
    name: String!
    ingredients: [Ingredient!]!
  }

  type RecipeDataLoader {
    id: Int!
    name: String!
    ingredientsDataLoader: [Ingredient!]!
  }

  type Query {
    recipies(owner: Int!): [Recipe!]!,
    recipiesByDataLoader(owner: Int!): [RecipeDataLoader!]!
  }

  schema {
    query: Query
  }
`;
