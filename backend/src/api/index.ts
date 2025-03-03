// API client for interacting with the backend

const API_URL = 'http://localhost:3000/api';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  author: string;
  ingredients: string[];
  instructions: string[];
}

export interface NewRecipe {
  title: string;
  image?: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  author: string;
  ingredients: string[];
  instructions: string[];
}

// Get all recipes
export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_URL}/recipes`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  
  return response.json();
}

// Get a single recipe by ID
export async function getRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${API_URL}/recipes/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch recipe');
  }
  
  return response.json();
}

// Create a new recipe
export async function createRecipe(recipe: NewRecipe): Promise<Recipe> {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create recipe');
  }
  
  return response.json();
}

// Update an existing recipe
export async function updateRecipe(id: string, recipe: Partial<Recipe>): Promise<Recipe> {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update recipe');
  }
  
  return response.json();
}

// Delete a recipe
export async function deleteRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete recipe');
  }
  
  return response.json();
}

// Search recipes
export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error('Failed to search recipes');
  }
  
  return response.json();
}