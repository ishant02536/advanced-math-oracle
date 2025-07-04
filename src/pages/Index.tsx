
import AdvancedCalculator from '@/components/AdvancedCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Advanced Calculator
        </h1>
        <AdvancedCalculator />
      </div>
    </div>
  );
};

export default Index;
