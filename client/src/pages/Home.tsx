import { useState, useEffect, useRef } from 'react';
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

  // Scale references for fixed-size mockups
  const tvContainerRef = useRef<HTMLDivElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const [tvScale, setTvScale] = useState(0);
  const [phoneScale, setPhoneScale] = useState(0);

  useEffect(() => {
    const tvObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setTvScale(entry.contentRect.width / 1600);
      }
    });
    
    const phoneObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setPhoneScale(entry.contentRect.width / 400);
      }
    });

    if (tvContainerRef.current) tvObserver.observe(tvContainerRef.current);
    if (phoneContainerRef.current) phoneObserver.observe(phoneContainerRef.current);

    return () => {
      tvObserver.disconnect();
      phoneObserver.disconnect();
    };
  }, []);

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
    <div className="fixed inset-0 w-full bg-background text-foreground flex flex-col overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header / Tabs */}
        <header className="p-2 sm:p-4 shrink-0 flex flex-col items-center gap-2 sm:gap-4">
          <div className="text-center space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white/90">Jio TeleOS</h1>
            <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] font-mono">Payments Demo</p>
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
                    flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(0,230,255,0.2)]' 
                      : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/90'}
                  `}
                >
                  <IconComponent size={14} className="sm:w-4 sm:h-4" />
                  {scenario.title}
                </button>
              );
            })}
          </div>
        </header>

        {/* Main Stage */}
        <main className="flex-1 relative w-full min-h-0 overflow-hidden flex items-center justify-center p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 2xl:p-32">
          <div className="flex flex-col xl:flex-row items-center justify-center gap-10 lg:gap-16 w-full max-w-[1500px] 2xl:max-w-[1800px] mx-auto h-full">
            
            {/* TV Mockup */}
            <div 
              ref={tvContainerRef}
              className="relative z-10 w-full max-w-[700px] xl:max-w-[850px] 2xl:max-w-[1000px] aspect-video shrink"
            >
              <div 
                className="w-[1600px] h-[900px] origin-top-left absolute top-0 left-0" 
                style={{ 
                  transform: `scale(${tvScale})`,
                  opacity: tvScale > 0 ? 1 : 0,
                  visibility: tvScale > 0 ? 'visible' : 'hidden'
                }}
              >
                <TVFrame 
                  step={currentStep} 
                  scenarioTitle={activeScenario.title}
                  onClick={handleTVClick} 
                />
              </div>
            </div>

            {/* Connection Arc */}
            <div className="relative z-0 w-12 sm:w-16 xl:w-20 shrink-0 flex justify-center items-center rotate-90 xl:rotate-0 hidden md:flex opacity-60">
               <ConnectionArc active={currentStep.handoffActive || false} />
            </div>

            {/* Phone Mockup */}
            <div 
              ref={phoneContainerRef}
              className="relative z-10 w-[240px] xl:w-[280px] 2xl:w-[320px] aspect-[1/2.1] shrink-0"
            >
              <div 
                className="w-[400px] h-[840px] origin-top-left absolute top-0 left-0" 
                style={{ 
                  transform: `scale(${phoneScale})`,
                  opacity: phoneScale > 0 ? 1 : 0,
                  visibility: phoneScale > 0 ? 'visible' : 'hidden'
                }}
              >
                <PhoneFrame step={currentStep} />
              </div>
            </div>

          </div>
        </main>

        {/* Controls Footer */}
        <footer className="p-4 shrink-0 flex flex-col items-center gap-3 mt-auto mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            {activeScenario.steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                  idx === currentStepIndex 
                    ? 'w-6 sm:w-8 bg-primary shadow-[0_0_10px_rgba(0,230,255,0.5)]' 
                    : idx < currentStepIndex
                      ? 'w-1.5 sm:w-2 bg-primary/40'
                      : 'w-1.5 sm:w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
            >
              <Icons.ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Previous
            </Button>
            <div className="text-xs sm:text-sm font-mono text-white/50 w-20 sm:w-24 text-center">
              Step {currentStepIndex + 1} / {activeScenario.steps.length}
            </div>
            <Button 
              size="sm"
              className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-background transition-all duration-300"
              onClick={handleNext}
              disabled={currentStepIndex === activeScenario.steps.length - 1}
            >
              Next <Icons.ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
