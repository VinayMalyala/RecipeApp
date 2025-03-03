import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, ChefHat } from 'lucide-react';
import { RecipeCard } from './components/RecipeCard';
import { getRecipes, searchRecipes, Recipe } from './api';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const data = await getRecipes();
        setRecipes(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      // If search is empty, fetch all recipes
      try {
        setIsLoading(true);
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    try {
      setIsLoading(true);
      const results = await searchRecipes(searchTerm);
      setRecipes(results);
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">RecipeShare</h1>
            </div>
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <button type="submit" className="sr-only">Search</button>
              </form>
              <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                <PlusCircle className="w-5 h-5" />
                <span>Add Recipe</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700">No recipes found</h2>
            <p className="text-gray-500 mt-2">Try a different search term or add a new recipe.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                image={recipe.image}
                cookTime={recipe.cookTime}
                servings={recipe.servings}
                difficulty={recipe.difficulty}
                author={recipe.author}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;