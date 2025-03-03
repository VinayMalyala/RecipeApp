import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// In-memory database
let recipes = [
  {
    id: "1",
    title: "Homemade Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Medium",
    author: "Chef Maria",
    ingredients: [
      "2 cups all-purpose flour",
      "1 teaspoon salt",
      "3/4 cup warm water",
      "1 teaspoon active dry yeast",
      "1 tablespoon olive oil",
      "1 cup tomato sauce",
      "8 oz fresh mozzarella",
      "Fresh basil leaves",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Mix flour, salt, water, yeast, and olive oil to make the dough.",
      "Let the dough rise for 1 hour.",
      "Preheat oven to 475°F (245°C).",
      "Roll out the dough and place on a baking sheet.",
      "Spread tomato sauce over the dough.",
      "Add sliced mozzarella and drizzle with olive oil.",
      "Bake for 12-15 minutes until crust is golden.",
      "Top with fresh basil leaves before serving."
    ]
  },
  {
    id: "2",
    title: "Classic Beef Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    cookTime: "20 mins",
    servings: 2,
    difficulty: "Easy",
    author: "John Doe",
    ingredients: [
      "1 lb ground beef (80/20)",
      "1 teaspoon salt",
      "1/2 teaspoon black pepper",
      "1 teaspoon Worcestershire sauce",
      "2 hamburger buns",
      "2 slices cheese (cheddar or American)",
      "Lettuce leaves",
      "Tomato slices",
      "Red onion slices",
      "Ketchup and mustard"
    ],
    instructions: [
      "Mix ground beef with salt, pepper, and Worcestershire sauce.",
      "Form into 2 patties, slightly larger than your buns.",
      "Press a small indent in the center of each patty with your thumb.",
      "Heat a skillet or grill to medium-high heat.",
      "Cook patties for 4-5 minutes per side for medium doneness.",
      "Add cheese during the last minute of cooking.",
      "Toast the buns lightly.",
      "Assemble burgers with lettuce, tomato, onion, and condiments."
    ]
  },
  {
    id: "3",
    title: "Fresh Summer Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Easy",
    author: "Sarah Smith",
    ingredients: [
      "4 cups mixed greens",
      "1 cup cherry tomatoes, halved",
      "1 cucumber, sliced",
      "1/2 red onion, thinly sliced",
      "1/4 cup feta cheese, crumbled",
      "1/4 cup Kalamata olives",
      "2 tablespoons olive oil",
      "1 tablespoon lemon juice",
      "1 teaspoon honey",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Wash and dry all produce.",
      "Combine mixed greens, tomatoes, cucumber, and red onion in a large bowl.",
      "In a small bowl, whisk together olive oil, lemon juice, honey, salt, and pepper.",
      "Pour dressing over the salad and toss gently.",
      "Top with feta cheese and olives.",
      "Serve immediately."
    ]
  }
];

// Routes
// Get all recipes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// Get a single recipe
app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  
  res.json(recipe);
});

// Create a new recipe
app.post('/api/recipes', (req, res) => {
  const { 
    title, 
    image, 
    cookTime, 
    servings, 
    difficulty, 
    author, 
    ingredients, 
    instructions 
  } = req.body;
  
  // Validation
  if (!title || !cookTime || !servings || !difficulty || !author) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  const newRecipe = {
    id: uuidv4(),
    title,
    image: image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&auto=format&fit=crop",
    cookTime,
    servings,
    difficulty,
    author,
    ingredients: ingredients || [],
    instructions: instructions || []
  };
  
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Update a recipe
app.put('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const { 
    title, 
    image, 
    cookTime, 
    servings, 
    difficulty, 
    author, 
    ingredients, 
    instructions 
  } = req.body;
  
  const recipeIndex = recipes.findIndex(r => r.id === id);
  
  if (recipeIndex === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  
  // Update recipe
  recipes[recipeIndex] = {
    ...recipes[recipeIndex],
    title: title || recipes[recipeIndex].title,
    image: image || recipes[recipeIndex].image,
    cookTime: cookTime || recipes[recipeIndex].cookTime,
    servings: servings || recipes[recipeIndex].servings,
    difficulty: difficulty || recipes[recipeIndex].difficulty,
    author: author || recipes[recipeIndex].author,
    ingredients: ingredients || recipes[recipeIndex].ingredients,
    instructions: instructions || recipes[recipeIndex].instructions
  };
  
  res.json(recipes[recipeIndex]);
});

// Delete a recipe
app.delete('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex(r => r.id === id);
  
  if (recipeIndex === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  
  const deletedRecipe = recipes[recipeIndex];
  recipes = recipes.filter(r => r.id !== id);
  
  res.json(deletedRecipe);
});

// Search recipes
app.get('/api/search', (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.json(recipes);
  }
  
  const searchTerm = query.toString().toLowerCase();
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm) || 
    recipe.author.toLowerCase().includes(searchTerm) ||
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
  );
  
  res.json(filteredRecipes);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});