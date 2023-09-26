CREATE TABLE Tag (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Recipe (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  averageCalories INT,
  prepTimeSeconds INT,
  imageUrl TEXT
);

CREATE TABLE Ingredient (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE Recipe_Ingredient (
  recipeId INT NOT NULL,
  ingredientId INT NOT NULL,
  requirementAmount FLOAT,
  requirementUnit TEXT,

  PRIMARY KEY (recipeId, ingredientId),
  CONSTRAINT fk_recipe_ingredient_recipe FOREIGN KEY(recipeId) REFERENCES Recipe(id),
  CONSTRAINT fk_recipe_ingredient_ingredient FOREIGN KEY(ingredientId) REFERENCES Ingredient(id)
);

CREATE TABLE Recipe_Tag (
  recipeId INT NOT NULL,
  tagId INT NOT NULL,

  PRIMARY KEY (recipeId, tagId),
  CONSTRAINT fk_recipe_tag_recipe FOREIGN KEY(recipeId) REFERENCES Recipe(id),
  CONSTRAINT fk_recipe_tag_tag FOREIGN KEY(tagId) REFERENCES Tag(id)
);

CREATE TABLE User_Recipe (
  userId INT NOT NULL,
  recipeId INT NOT NULL,
  isFavorite BOOLEAN,
  rating INT,
  
  PRIMARY KEY (userId, recipeId),
  CONSTRAINT fk_user_recipe_user FOREIGN KEY(userId) REFERENCES "User"(id),
  CONSTRAINT fk_user_recipe_recipe FOREIGN KEY(recipeId) REFERENCES Recipe(id)
);


