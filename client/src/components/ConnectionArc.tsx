import { motion } from 'framer-motion';

interface ConnectionArcProps {
  active: boolean;
}

export default function ConnectionArc({ active }: ConnectionArcProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-visible">
      {/* Base dashed line */}
      <svg width="120" height="40" viewBox="0 0 120 40" className="absolute" style={{ overflow: 'visible' }}>
        <path 
          d="M 0 20 Q 60 40 120 20" 
          fill="none" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Active Glowing Arc */}
      {active && (
        <motion.svg 
          width="120" 
          height="40" 
          viewBox="0 0 120 40" 
          className="absolute z-10"
          style={{ overflow: 'visible' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.path 
            d="M 0 20 Q 60 40 120 20" 
            fill="none" 
            stroke="#00E6FF" 
            strokeWidth="3"
            className="arc-glow"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear"
            }}
          />
          {/* Data packet particle */}
          <motion.circle
            r="4"
            fill="#FFF"
            className="arc-glow"
            animate={{
              offsetDistance: ["0%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              offsetPath: "path('M 0 20 Q 60 40 120 20')"
            }}
          />
        </motion.svg>
      )}

      {/* Signal Ripple Effect when active */}
      {active && (
        <motion.div 
          className="absolute w-8 h-8 rounded-full bg-primary/20 blur-[8px] z-0"
          animate={{
            scale: [1, 2.5],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </div>
  );
}
