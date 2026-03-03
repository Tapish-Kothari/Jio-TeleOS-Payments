import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCENARIOS, Scenario, Step } from '@/lib/scenarios';
import TVFrame from '@/components/TVFrame';
import PhoneFrame from '@/components/PhoneFrame';
import ConnectionArc from '@/components/ConnectionArc';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  
  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];
  const currentStep = activeScenario.steps[currentStepIndex];

  // Reset step when scenario changes
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [activeScenarioId]);

  const handleNext = () => {
    if (currentStepIndex < activeScenario.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleTVClick = () => {
    handleNext();
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Header / Tabs */}
      <header className="z-10 p-6 flex flex-col items-center gap-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white/90">Jio TeleOS</h1>
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-mono">Payments Demo</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
          {SCENARIOS.map(scenario => {
            const IconComponent = (Icons as any)[scenario.icon] || Icons.Circle;
            const isActive = activeScenarioId === scenario.id;
            
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(0,230,255,0.2)]' 
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/90'}
                `}
              >
                <IconComponent size={16} />
                {scenario.title}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Stage */}
      <main className="flex-1 flex items-center justify-center relative z-10 p-8 perspective-[1000px]">
        <div className="flex items-center gap-12 max-w-7xl w-full justify-center transform-style-3d">
          
          {/* TV Mockup */}
          <div className="relative z-10 w-[800px] aspect-video shrink-0">
            <TVFrame 
              step={currentStep} 
              scenarioTitle={activeScenario.title}
              onClick={handleTVClick} 
            />
          </div>

          {/* Connection Arc */}
          <div className="relative z-0 w-32 shrink-0 flex justify-center items-center">
             <ConnectionArc active={currentStep.handoffActive || false} />
          </div>

          {/* Phone Mockup */}
          <div className="relative z-10 w-[300px] h-[600px] shrink-0">
            <PhoneFrame step={currentStep} />
          </div>

        </div>
      </main>

      {/* Controls Footer */}
      <footer className="z-10 p-6 flex flex-col items-center gap-4 bg-gradient-to-t from-background to-transparent">
        <div className="flex items-center gap-3">
          {activeScenario.steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentStepIndex 
                  ? 'w-8 bg-primary shadow-[0_0_10px_rgba(0,230,255,0.5)]' 
                  : idx < currentStepIndex
                    ? 'w-2 bg-primary/40'
                    : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
          >
            <Icons.ChevronLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <div className="text-sm font-mono text-white/50 w-24 text-center">
            Step {currentStepIndex + 1} / {activeScenario.steps.length}
          </div>
          <Button 
            className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-background transition-all duration-300"
            onClick={handleNext}
            disabled={currentStepIndex === activeScenario.steps.length - 1}
          >
            Next <Icons.ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
