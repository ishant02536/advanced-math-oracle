
import React from 'react';
import CalculatorButton from './CalculatorButton';

interface ButtonGridProps {
  onButtonPress: (value: string) => void;
  isScientific: boolean;
  hasMemory: boolean;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonPress, isScientific, hasMemory }) => {
  const basicButtons = [
    ['C', 'CE', '±', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '%', '=']
  ];

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'log'],
    ['ln', '√', 'x²', 'x!'],
    ['(', ')', '^', 'π']
  ];

  const memoryButtons = ['MC', 'MR', 'M+', 'M-'];

  return (
    <div className="space-y-4">
      {/* Mode Toggle Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <CalculatorButton
          value="Scientific"
          onClick={onButtonPress}
          variant={isScientific ? 'active' : 'secondary'}
          className="text-sm"
        />
        <CalculatorButton
          value="History"
          onClick={onButtonPress}
          variant="secondary"
          className="text-sm"
        />
      </div>

      {/* Memory Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {memoryButtons.map((btn) => (
          <CalculatorButton
            key={btn}
            value={btn}
            onClick={onButtonPress}
            variant={btn === 'MR' && hasMemory ? 'active' : 'memory'}
            className="text-sm"
          />
        ))}
      </div>

      {/* Scientific Functions */}
      {isScientific && (
        <div className="space-y-2">
          {scientificButtons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-2">
              {row.map((btn) => (
                <CalculatorButton
                  key={btn}
                  value={btn}
                  onClick={onButtonPress}
                  variant="scientific"
                  className="text-sm"
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Basic Calculator Buttons */}
      <div className="space-y-2">
        {basicButtons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {row.map((btn, btnIndex) => {
              let variant: 'number' | 'operator' | 'special' | 'equals' = 'number';
              
              if (['÷', '×', '-', '+'].includes(btn)) variant = 'operator';
              else if (['C', 'CE', '±', '%'].includes(btn)) variant = 'special';
              else if (btn === '=') variant = 'equals';
              
              return (
                <CalculatorButton
                  key={btn}
                  value={btn}
                  onClick={onButtonPress}
                  variant={variant}
                  className={btn === '0' ? 'col-span-2' : ''}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonGrid;
