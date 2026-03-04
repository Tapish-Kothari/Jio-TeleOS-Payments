import { motion, AnimatePresence } from 'framer-motion';
import { Step } from '@/lib/scenarios';
import { Check, ShieldCheck, X } from 'lucide-react';

interface PhoneFrameProps {
  step: Step;
}

export default function PhoneFrame({ step }: PhoneFrameProps) {
  const { phoneState, phoneContent } = step;

  return (
    <div className="w-full h-full rounded-[40px] border-[10px] border-[#0a0a0a] bg-black shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-white/10">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0a0a0a] rounded-b-2xl z-50"></div>
      
      {/* Status Bar */}
      <div className="h-12 w-full flex justify-between items-center px-6 text-white/80 text-xs font-medium z-40 relative">
        <span>10:42</span>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-3 border border-white/80 rounded-[2px]"></div>
          <div className="w-3 h-3 bg-white/80 rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 relative bg-[#090C15]">
        <AnimatePresence mode="wait">
          
          {/* IDLE STATE */}
          {phoneState === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              <div className="text-center">
                <div className="text-6xl font-light text-white/90 mb-2">10:42</div>
                <div className="text-white/50 text-lg">Tuesday, October 15</div>
              </div>
              
              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full" />
            </motion.div>
          )}

          {/* NOTIFICATION STATE */}
          {phoneState === 'notification' && (
            <motion.div 
              key="notification"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 p-4 pt-16 flex flex-col gap-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary text-black flex items-center justify-center font-bold text-xs">J</div>
                    <span className="text-white/80 text-sm">JioPay</span>
                  </div>
                  <span className="text-white/40 text-xs">now</span>
                </div>
                <h3 className="text-white font-medium mb-1">{phoneContent?.title}</h3>
                <p className="text-white/70 text-sm mb-3">{phoneContent?.subtitle}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-black py-2 rounded-lg text-sm font-medium">Pay {phoneContent?.amount}</button>
                  <button className="flex-1 bg-white/10 text-white py-2 rounded-lg text-sm font-medium">Decline</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* UPI PIN STATE */}
          {phoneState === 'upi_pin' && (
            <motion.div 
              key="upi"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute inset-0 bg-white flex flex-col"
            >
              <div className="bg-[#f0f0f0] p-6 pt-16 pb-8 text-center flex flex-col items-center shadow-sm">
                <div className="text-[#333] text-sm mb-2 font-medium">Paying to</div>
                <div className="text-2xl font-bold text-black mb-1">Jio TeleOS App</div>
                <div className="text-4xl font-mono mt-4 text-black">{phoneContent?.amount}</div>
              </div>
              
              <div className="flex-1 p-6 flex flex-col items-center justify-center">
                <div className="text-sm text-gray-500 mb-6">ENTER 4-DIGIT UPI PIN</div>
                
                {/* PIN Dots */}
                <div className="flex gap-4 mb-12">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-gray-400"></div>
                  ))}
                </div>
                
                {/* Numpad */}
                <div className="grid grid-cols-3 gap-y-6 gap-x-12 w-full max-w-[240px] mb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((key, i) => (
                    <div key={i} className="flex justify-center items-center h-12">
                      {key === 'del' ? (
                        <div className="text-gray-400"><X size={24} /></div>
                      ) : key !== '' ? (
                        <div className="text-3xl font-light text-black">{key}</div>
                      ) : null}
                    </div>
                  ))}
                </div>
                
                <div className="w-full flex justify-end px-4">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg text-black animate-pulse">
                    <Check size={28} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* FAMILY AUTH STATE */}
          {phoneState === 'family_auth' && (
            <motion.div 
              key="family"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 p-6 pt-20 flex flex-col bg-[#0F1626]"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-6 self-center">
                <ShieldCheck size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-white text-center mb-2">{phoneContent?.title}</h2>
              <p className="text-white/60 text-center mb-8">{phoneContent?.subtitle}</p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60">Amount</span>
                  <span className="text-xl font-mono text-white">{phoneContent?.amount}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60">Profile</span>
                  <span className="text-white">Kids (Aarav)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">App</span>
                  <span className="text-white">Minecraft</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-primary text-black font-bold rounded-xl text-lg">
                  Approve Purchase
                </button>
                <button className="w-full py-4 bg-transparent text-white/50 font-medium rounded-xl border border-white/10">
                  Deny Request
                </button>
              </div>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {phoneState === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[#0F1626] flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              >
                <Check size={48} strokeWidth={3} />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Payment Done</h2>
              <p className="text-white/60">Transaction successful.</p>
              <p className="text-white/40 text-sm mt-8">You can look back at the TV now.</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
