import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import { cn } from '../lib/utils';

interface RecipeCardProps {
  title: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  author: string;
  className?: string;
}

export function RecipeCard({
  title,
  image,
  cookTime,
  servings,
  difficulty,
  author,
  className,
}: RecipeCardProps) {
  return (
    <div className={cn("bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]", className)}>
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="w-4 h-4 mr-1" />
          <span>{cookTime}</span>
          <Users className="w-4 h-4 ml-4 mr-1" />
          <span>{servings} servings</span>
          <ChefHat className="w-4 h-4 ml-4 mr-1" />
          <span>{difficulty}</span>
        </div>
        <p className="text-sm text-gray-500">By {author}</p>
      </div>
    </div>
  );
}