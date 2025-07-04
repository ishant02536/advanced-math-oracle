
import React from 'react';

interface DisplayProps {
  value: string;
  memory: number;
  operation: string | null;
}

const Display: React.FC<DisplayProps> = ({ value, memory, operation }) => {
  const formatDisplay = (val: string) => {
    // Handle very long numbers
    if (val.length > 12) {
      const num = parseFloat(val);
      if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6);
      }
      return num.toPrecision(12);
    }
    return val;
  };

  return (
    <div className="bg-black/30 rounded-2xl p-4 mb-4 border border-white/5">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2">
          {memory !== 0 && (
            <span className="text-purple-400 text-xs font-medium bg-purple-400/20 px-2 py-1 rounded-full">
              M
            </span>
          )}
          {operation && (
            <span className="text-blue-400 text-xs font-medium bg-blue-400/20 px-2 py-1 rounded-full">
              {operation}
            </span>
          )}
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-white text-3xl font-light font-mono tracking-wider leading-tight">
          {formatDisplay(value)}
        </div>
      </div>
    </div>
  );
};

export default Display;
