
import React from 'react';
import { X, Clock } from 'lucide-react';

interface HistoryPanelProps {
  history: string[];
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClose }) => {
  return (
    <div className="mt-4 bg-black/30 rounded-2xl border border-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-purple-400" />
          <span className="text-white font-medium">History</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="max-h-60 overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-4 text-center text-white/60">
            No calculations yet
          </div>
        ) : (
          <div className="p-2">
            {history.map((calculation, index) => (
              <div
                key={index}
                className="p-3 mb-2 last:mb-0 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-white/80 font-mono text-sm">
                  {calculation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
