
import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  variant?: 'number' | 'operator' | 'special' | 'equals' | 'scientific' | 'memory' | 'secondary' | 'active';
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ 
  value, 
  onClick, 
  variant = 'number',
  className 
}) => {
  const baseClasses = "h-14 rounded-xl font-medium transition-all duration-200 active:scale-95 border border-white/10";
  
  const variantClasses = {
    number: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm",
    operator: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/25",
    special: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/25",
    equals: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/25",
    scientific: "bg-gradient-to-r from-indigo-500/30 to-purple-500/30 hover:from-indigo-500/50 hover:to-purple-500/50 text-white backdrop-blur-sm",
    memory: "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 hover:from-yellow-500/50 hover:to-orange-500/50 text-white backdrop-blur-sm",
    secondary: "bg-white/5 hover:bg-white/10 text-white/70 backdrop-blur-sm",
    active: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/25"
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default CalculatorButton;
