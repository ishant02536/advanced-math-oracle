
import React, { useState, useEffect, useCallback } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import HistoryPanel from './HistoryPanel';
import { Calculator } from 'lucide-react';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
  memory: number;
  history: string[];
  showHistory: boolean;
  isScientific: boolean;
}

const AdvancedCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    memory: 0,
    history: [],
    showHistory: false,
    isScientific: false,
  });

  const handleButtonPress = useCallback((value: string) => {
    console.log('Button pressed:', value);
    
    setState(prevState => {
      const newState = { ...prevState };
      
      // Handle different button types
      if (value >= '0' && value <= '9') {
        // Number input
        if (newState.waitingForNewValue) {
          newState.display = value;
          newState.waitingForNewValue = false;
        } else {
          newState.display = newState.display === '0' ? value : newState.display + value;
        }
      } else if (value === '.') {
        // Decimal point
        if (!newState.display.includes('.')) {
          newState.display = newState.waitingForNewValue ? '0.' : newState.display + '.';
          newState.waitingForNewValue = false;
        }
      } else if (['+', '-', '×', '÷', '^'].includes(value)) {
        // Basic operations
        const currentValue = parseFloat(newState.display);
        
        if (newState.previousValue !== null && newState.operation && !newState.waitingForNewValue) {
          const result = calculate(newState.previousValue, currentValue, newState.operation);
          newState.display = result.toString();
          newState.previousValue = result;
        } else {
          newState.previousValue = currentValue;
        }
        
        newState.operation = value;
        newState.waitingForNewValue = true;
      } else if (value === '=') {
        // Calculate result
        if (newState.previousValue !== null && newState.operation) {
          const currentValue = parseFloat(newState.display);
          const result = calculate(newState.previousValue, currentValue, newState.operation);
          const calculation = `${newState.previousValue} ${newState.operation} ${currentValue} = ${result}`;
          
          newState.display = result.toString();
          newState.history = [calculation, ...newState.history.slice(0, 9)]; // Keep last 10 calculations
          newState.previousValue = null;
          newState.operation = null;
          newState.waitingForNewValue = true;
        }
      } else if (value === 'C') {
        // Clear all
        newState.display = '0';
        newState.previousValue = null;
        newState.operation = null;
        newState.waitingForNewValue = false;
      } else if (value === 'CE') {
        // Clear entry
        newState.display = '0';
      } else if (value === '±') {
        // Toggle sign
        const currentValue = parseFloat(newState.display);
        newState.display = (-currentValue).toString();
      } else if (value === '%') {
        // Percentage
        const currentValue = parseFloat(newState.display);
        newState.display = (currentValue / 100).toString();
      } else if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'x!'].includes(value)) {
        // Scientific functions
        const currentValue = parseFloat(newState.display);
        const result = calculateScientific(currentValue, value);
        const calculation = `${value}(${currentValue}) = ${result}`;
        
        newState.display = result.toString();
        newState.history = [calculation, ...newState.history.slice(0, 9)];
        newState.waitingForNewValue = true;
      } else if (value === 'MC') {
        // Memory clear
        newState.memory = 0;
      } else if (value === 'MR') {
        // Memory recall
        newState.display = newState.memory.toString();
        newState.waitingForNewValue = true;
      } else if (value === 'M+') {
        // Memory add
        newState.memory += parseFloat(newState.display);
      } else if (value === 'M-') {
        // Memory subtract
        newState.memory -= parseFloat(newState.display);
      } else if (value === 'History') {
        // Toggle history
        newState.showHistory = !newState.showHistory;
      } else if (value === 'Scientific') {
        // Toggle scientific mode
        newState.isScientific = !newState.isScientific;
      }
      
      return newState;
    });
  }, []);

  const calculate = (prev: number, current: number, operation: string): number => {
    switch (operation) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '×': return prev * current;
      case '÷': return current !== 0 ? prev / current : 0;
      case '^': return Math.pow(prev, current);
      default: return current;
    }
  };

  const calculateScientific = (value: number, func: string): number => {
    switch (func) {
      case 'sin': return Math.sin(value * Math.PI / 180);
      case 'cos': return Math.cos(value * Math.PI / 180);
      case 'tan': return Math.tan(value * Math.PI / 180);
      case 'log': return Math.log10(value);
      case 'ln': return Math.log(value);
      case '√': return Math.sqrt(value);
      case 'x²': return value * value;
      case 'x!': return factorial(Math.floor(value));
      default: return value;
    }
  };

  const factorial = (n: number): number => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key >= '0' && key <= '9') {
        handleButtonPress(key);
      } else if (key === '.') {
        handleButtonPress('.');
      } else if (key === '+') {
        handleButtonPress('+');
      } else if (key === '-') {
        handleButtonPress('-');
      } else if (key === '*') {
        handleButtonPress('×');
      } else if (key === '/') {
        event.preventDefault();
        handleButtonPress('÷');
      } else if (key === 'Enter' || key === '=') {
        handleButtonPress('=');
      } else if (key === 'Escape') {
        handleButtonPress('C');
      } else if (key === 'Backspace') {
        handleButtonPress('CE');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleButtonPress]);

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Calculator className="text-purple-400" size={24} />
        <span className="text-white font-medium">Advanced Calculator</span>
      </div>
      
      <Display 
        value={state.display} 
        memory={state.memory}
        operation={state.operation}
      />
      
      <ButtonGrid 
        onButtonPress={handleButtonPress}
        isScientific={state.isScientific}
        hasMemory={state.memory !== 0}
      />
      
      {state.showHistory && (
        <HistoryPanel 
          history={state.history}
          onClose={() => handleButtonPress('History')}
        />
      )}
    </div>
  );
};

export default AdvancedCalculator;
