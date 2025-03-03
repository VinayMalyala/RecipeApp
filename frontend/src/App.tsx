import React from 'react';
import { PlusCircle, Search, ChefHat, Clock, Users } from 'lucide-react';

const SAMPLE_RECIPES = [
  {
    id: 1,
    title: "Homemade Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Medium",
    author: "Chef Maria"
  },
  {
    id: 2,
    title: "Classic Beef Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    cookTime: "20 mins",
    servings: 2,
    difficulty: "Easy",
    author: "John Doe"
  },
  {
    id: 3,
    title: "Fresh Summer Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Easy",
    author: "Sarah Smith"
  }
];

function App() {
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-48">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{recipe.cookTime}</span>
                  <Users className="w-4 h-4 ml-4 mr-1" />
                  <span>{recipe.servings} servings</span>
                  <ChefHat className="w-4 h-4 ml-4 mr-1" />
                  <span>{recipe.difficulty}</span>
                </div>
                <p className="text-sm text-gray-500">By {recipe.author}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;