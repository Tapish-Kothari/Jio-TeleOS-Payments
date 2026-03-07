import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step } from '@/lib/scenarios';
import { Play, CreditCard, Smartphone, QrCode, CheckCircle2, User, Wallet, Loader2, Plus, Mic, Zap, CircleDot } from 'lucide-react';
import AIOverlay, { AIPhase } from './AIOverlay';

interface PaymentMethod {
  id: string;
  icon: React.ElementType;
  label: string;
}

const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'upi', icon: QrCode, label: 'UPI / Scan QR' },
  { id: 'wallet', icon: Wallet, label: 'JioPay Wallet' },
  { id: 'postpaid', icon: Smartphone, label: 'Jio Postpaid Billing' },
  { id: 'saved_card', icon: CreditCard, label: 'Saved Card (...4242)' },
  { id: 'new_card', icon: Plus, label: 'Add New Card' },
];

interface TVFrameProps {
  step: Step;
  scenarioTitle: string;
  scenarioId: string;
  onClick: () => void;
  onMethodSelect?: (method: string) => void;
  selectedMethod?: string;
  paymentMethods?: PaymentMethod[];
  aiPhase?: AIPhase | null;
  onAITrigger?: () => void;
  onAIDismiss?: () => void;
  onAIExecute?: (method: string) => void;
  onAIShowAllOptions?: () => void;
}

export default function TVFrame({ step, scenarioTitle, scenarioId, onClick, onMethodSelect, selectedMethod = 'upi', paymentMethods, aiPhase, onAITrigger, onAIDismiss, onAIExecute, onAIShowAllOptions }: TVFrameProps) {
  const { tvState, tvContent } = step;

  // Background image placeholder based on scenario
  const getBgImage = () => {
    if (scenarioTitle.includes('IPL')) return 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop';
    if (scenarioTitle.includes('OTT')) return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop';
    if (scenarioTitle.includes('Gaming')) return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop';
    if (scenarioTitle.includes('Saavn')) return 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2000&auto=format&fit=crop';
    if (scenarioTitle.includes('Commerce')) return 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2000&auto=format&fit=crop';
  };

  return (
    <div 
      className="w-full h-full rounded-[32px] overflow-hidden bg-black border-[12px] border-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative cursor-pointer group ring-1 ring-white/10"
      onClick={onClick}
    >
      {/* TV Bezel Reflection */}
      <div className="absolute inset-0 rounded-[20px] pointer-events-none border border-white/10 z-50"></div>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{ 
            backgroundImage: `url(${getBgImage()})`,
            filter: (tvState === 'content_playing') ? 'brightness(0.7)' : 'brightness(0.3) blur(10px)',
          }}
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Screen Content */}
      <div className="relative z-10 w-full h-full p-12 flex flex-col justify-between">
        
        {/* Top Bar */}
        <header className="flex justify-between items-center opacity-80 pt-4 px-8 z-20">
          <div className="text-3xl font-bold tracking-wider text-white drop-shadow-md">TeleOS</div>
          <div className="flex gap-4 items-center text-xl drop-shadow-md">
            <User className="w-8 h-8" /> Profile 1
            <div className="w-px h-6 bg-white/30 mx-2" />
            10:42 PM
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center p-8 mt-16 pb-16 z-10">
          <AnimatePresence mode="wait">
            
            {/* CONTENT PLAYING STATE */}
            {tvState === 'content_playing' && (
              <motion.div 
                key="playing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex items-end pb-12"
              >
                <div>
                  <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">{tvContent?.title}</h1>
                  <p className="text-2xl text-white/80 flex items-center gap-3 drop-shadow-md">
                    <span className="bg-primary text-black text-sm px-2 py-1 rounded font-bold uppercase">Ad</span>
                    {tvContent?.subtitle}
                  </p>
                </div>
              </motion.div>
            )}

            {/* PAYWALL STATE */}
            {tvState === 'paywall' && (
              <motion.div 
                key="paywall"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="glass-card rounded-2xl p-10 max-w-2xl w-full flex flex-col gap-6 items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                  <CreditCard size={32} />
                </div>
                <h2 className="text-4xl font-bold text-white">{tvContent?.title}</h2>
                <p className="text-xl text-white/70">{tvContent?.subtitle}</p>
                
                {tvContent?.price && (
                  <div className="text-5xl font-mono font-light text-primary my-4">{tvContent.price}</div>
                )}
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />
                
                <button className="bg-primary text-black font-bold text-xl py-4 px-12 rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                  Proceed to Pay
                </button>
              </motion.div>
            )}

            {/* PAYMENT METHODS STATE */}
            {tvState === 'payment_methods' && (
              <motion.div 
                key="methods"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full flex gap-12 items-center justify-center"
              >
                <div className="flex-1 max-w-md">
                  <h2 className="text-4xl font-bold text-white mb-4">{tvContent?.title}</h2>
                  <p className="text-xl text-white/70 mb-8">{tvContent?.subtitle}</p>
                  {tvContent?.price && (
                    <div className="text-4xl font-mono text-primary mb-8">{tvContent.price}</div>
                  )}
                </div>
                
                <div className="flex-1 max-w-md flex flex-col gap-3">
                  {(paymentMethods || DEFAULT_PAYMENT_METHODS).map((method) => {
                    const isActive = selectedMethod === method.id;
                    return (
                      <div 
                        key={method.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onMethodSelect) onMethodSelect(method.id);
                        }}
                        className={`p-4 rounded-xl flex items-center gap-4 border transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(0,230,255,0.2)] scale-105 ml-4' 
                            : 'glass-panel border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <method.icon className={isActive ? 'text-primary' : 'text-white/70'} size={24} />
                        <span className={`text-lg ${isActive ? 'text-white font-semibold' : 'text-white/80'}`}>
                          {method.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* WALLET CONFIRM STATE */}
            {tvState === 'wallet_confirm' && (
              <motion.div 
                key="wallet"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="glass-card rounded-2xl p-10 max-w-2xl w-full flex flex-col gap-6 items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
                  <Wallet size={32} />
                </div>
                <h2 className="text-4xl font-bold text-white">{tvContent?.title}</h2>
                <p className="text-xl text-white/70">{tvContent?.subtitle}</p>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 my-2 flex items-center gap-4">
                   <div className="text-white/60">Current Balance:</div>
                   <div className="text-2xl font-mono text-green-400">{tvContent?.price?.split(': ')[1] || '₹1,500'}</div>
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />
                
                <button className="bg-primary text-black font-bold text-xl py-4 px-12 rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                  Confirm Payment
                </button>
              </motion.div>
            )}

            {/* POSTPAID CONFIRM STATE */}
            {tvState === 'postpaid_confirm' && (
              <motion.div 
                key="postpaid"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="glass-card rounded-2xl p-10 max-w-2xl w-full flex flex-col gap-6 items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                  <Smartphone size={32} />
                </div>
                <h2 className="text-4xl font-bold text-white">{tvContent?.title}</h2>
                <p className="text-xl text-white/70">{tvContent?.subtitle}</p>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 my-2 text-white/80">
                   This amount will be added to your next billing cycle.
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />
                
                <button className="bg-primary text-black font-bold text-xl py-4 px-12 rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                  Confirm & Add to Bill
                </button>
              </motion.div>
            )}

            {/* SAVED CARD CONFIRM STATE */}
            {tvState === 'saved_card_confirm' && (
              <motion.div 
                key="saved_card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="glass-card rounded-2xl p-10 max-w-2xl w-full flex flex-col gap-6 items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#0047AB]/20 flex items-center justify-center text-[#00E6FF] mb-2 border border-[#0047AB]/50">
                  <CreditCard size={32} />
                </div>
                <h2 className="text-4xl font-bold text-white">{tvContent?.title}</h2>
                <p className="text-xl text-white/70">{tvContent?.subtitle}</p>
                
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10 mt-4">
                  <Smartphone className="text-primary w-8 h-8" />
                  <div className="text-left">
                    <div className="text-white font-medium">OTP Sent to Mobile</div>
                    <div className="text-white/50 text-sm">Check your phone to authorize payment</div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* QR CODE NEW CARD STATE */}
            {tvState === 'qr_code_new_card' && (
              <motion.div 
                key="qrcode_new"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                className="glass-card rounded-2xl p-12 max-w-3xl w-full flex gap-12 items-center"
              >
                <div className="bg-white p-4 rounded-xl flex-shrink-0 relative">
                  <div className="w-48 h-48 bg-black/5 flex items-center justify-center border-4 border-dashed border-black/20 rounded-lg">
                    {/* Simulated QR Pattern */}
                    <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full p-2">
                      {Array.from({length: 16}).map((_, i) => (
                        <div key={i} className={`bg-[#0047AB] rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-20'}`} />
                      ))}
                    </div>
                  </div>
                  {/* Scanner laser animation */}
                  <motion.div 
                    className="absolute left-0 right-0 h-1 bg-[#00E6FF]/80 shadow-[0_0_10px_#00E6FF]"
                    animate={{ top: ['10%', '90%', '10%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-white mb-4">{tvContent?.title}</h2>
                  <p className="text-xl text-white/70 mb-8">{tvContent?.subtitle}</p>
                  
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                    <CreditCard className="text-primary w-8 h-8" />
                    <div>
                      <div className="text-white font-medium">Secure Card Addition</div>
                      <div className="text-white/50 text-sm">Card details will be tokenized and saved</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* QR CODE STATE */}
            {tvState === 'qr_code' && (
              <motion.div 
                key="qrcode"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                className="glass-card rounded-2xl p-12 max-w-3xl w-full flex gap-12 items-center"
              >
                <div className="bg-white p-4 rounded-xl flex-shrink-0 relative">
                  <div className="w-48 h-48 bg-black/5 flex items-center justify-center border-4 border-dashed border-black/20 rounded-lg">
                    {/* Simulated QR Pattern */}
                    <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full p-2">
                      {Array.from({length: 16}).map((_, i) => (
                        <div key={i} className={`bg-black rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-20'}`} />
                      ))}
                    </div>
                  </div>
                  {/* Scanner laser animation */}
                  <motion.div 
                    className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_10px_#00E6FF]"
                    animate={{ top: ['10%', '90%', '10%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-white mb-4">{tvContent?.title}</h2>
                  <p className="text-xl text-white/70 mb-8">{tvContent?.subtitle}</p>
                  
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                    <Smartphone className="text-primary w-8 h-8" />
                    <div>
                      <div className="text-white font-medium">Seamless Handoff Active</div>
                      <div className="text-white/50 text-sm">Check your phone to complete payment</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* WAITING STATE */}
            {tvState === 'waiting' && (
              <motion.div 
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-white/10 rounded-full"></div>
                  <div className="w-32 h-32 border-4 border-primary rounded-full absolute top-0 left-0 border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-primary">
                    <Smartphone size={32} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mt-8 mb-2">
                  {tvContent?.title || 'Awaiting Payment'}
                </h2>
                <p className="text-xl text-white/60">
                  {tvContent?.subtitle || 'Complete the transaction on your mobile device'}
                </p>
              </motion.div>
            )}

            {/* SUCCESS STATE */}
            {tvState === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                  className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mb-8"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-400" />
                </motion.div>
                <h2 className="text-5xl font-bold text-white mb-4">{tvContent?.title}</h2>
                <p className="text-2xl text-white/70">{tvContent?.subtitle}</p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-12 text-white/40 text-sm flex items-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" /> Returning to content...
                </motion.div>
              </motion.div>
            )}

            {/* SUBSCRIPTION HUB */}
            {tvState === 'subscription_hub' && (
              <motion.div
                key="hub"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-bold text-white">Active Subscriptions</h2>
                  <div className="bg-primary/10 border border-primary/30 px-5 py-3 rounded-xl text-right">
                    <div className="text-white/50 text-sm">Total monthly spend</div>
                    <div className="text-primary font-mono text-2xl font-bold">₹2,516/mo</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: 'Netflix Premium', price: '₹649/mo', next: 'Next billing: 15 Oct' },
                    { name: 'Disney+ Hotstar', price: '₹149/mo', next: 'Next billing: 20 Oct', active: true },
                    { name: 'Amazon Prime', price: '₹1499/yr', next: 'Next billing: 5 Jan' },
                    { name: 'Spotify Premium', price: '₹119/mo', next: 'Next billing: 22 Oct' },
                  ].map((sub, i) => (
                    <div key={i} className={`glass-panel p-6 rounded-xl flex justify-between items-center ${sub.active ? 'ring-2 ring-primary bg-primary/10' : ''}`}>
                      <div>
                        <div className="text-2xl font-semibold text-white mb-1">{sub.name}</div>
                        <div className="text-white/50">{sub.next}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-mono text-white/90 mb-2">{sub.price}</div>
                        {sub.active && (
                          <button className="text-sm bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-white transition-colors">Manage</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RECHARGE SELECT */}
            {tvState === 'recharge_select' && (
               <motion.div 
                key="recharge"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl flex flex-col gap-10 items-center text-center mt-8"
               >
                 <div className="space-y-4">
                   <h2 className="text-5xl font-bold text-white tracking-wide">{tvContent?.title}</h2>
                   <p className="text-2xl text-white/60">{tvContent?.subtitle}</p>
                 </div>
                 
                 <div className="flex gap-6 mt-4">
                   {[
                     { name: 'Mom', num: '+91 98765 43210', active: true },
                     { name: 'Dad', num: '+91 87654 32109', active: false },
                     { name: 'Self', num: '+91 76543 21098', active: false }
                   ].map((contact, i) => (
                     <div key={i} className={`p-10 w-[280px] rounded-3xl flex flex-col items-center gap-6 cursor-pointer transition-all ${
                       contact.active 
                        ? 'bg-gradient-to-b from-primary/20 to-transparent border-2 border-primary scale-105 shadow-[0_0_30px_rgba(0,230,255,0.15)]' 
                        : 'bg-[#181C2A] border-2 border-transparent hover:bg-[#1E2335]'
                     }`}>
                       <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white ${
                         contact.active ? 'bg-white/20' : 'bg-[#2A2E3D]'
                       }`}>
                         {contact.name[0]}
                       </div>
                       <div className="space-y-2">
                         <div className="text-2xl font-semibold text-white">{contact.name}</div>
                         <div className="text-white/50 text-lg font-mono">{contact.num}</div>
                       </div>
                     </div>
                   ))}
                 </div>
               </motion.div>
            )}

            {/* RECHARGE PLAN STATE */}
            {tvState === 'recharge_plan' && (
              <motion.div
                key="recharge_plan"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl"
              >
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-white">{tvContent?.title}</h2>
                  <p className="text-xl text-white/60 mt-2">{tvContent?.subtitle}</p>
                </div>
                <div className="grid grid-cols-4 gap-5">
                  {[
                    { price: '₹199', validity: '28 days', data: '2GB/day', calls: 'Unlimited', highlight: false },
                    { price: '₹299', validity: '28 days', data: '3GB/day', calls: 'Unlimited + SMS', highlight: true },
                    { price: '₹499', validity: '56 days', data: '2GB/day', calls: 'Unlimited + SMS', highlight: false },
                    { price: '₹719', validity: '84 days', data: '2GB/day', calls: 'Unlimited + SMS', highlight: false },
                  ].map((plan, i) => (
                    <div key={i} className={`p-6 rounded-2xl flex flex-col gap-3 cursor-pointer transition-all ${
                      plan.highlight
                        ? 'bg-primary/20 border-2 border-primary scale-105 shadow-[0_0_25px_rgba(0,230,255,0.2)]'
                        : 'glass-panel border border-white/10 hover:bg-white/10'
                    }`}>
                      <div className={`text-3xl font-mono font-bold ${plan.highlight ? 'text-primary' : 'text-white'}`}>{plan.price}</div>
                      <div className="text-white/50 text-sm">{plan.validity}</div>
                      <div className="w-full h-px bg-white/10 my-1" />
                      <div className="text-white/80 text-sm">{plan.data}</div>
                      <div className="text-white/60 text-xs">{plan.calls}</div>
                      {plan.highlight && <div className="text-xs text-primary font-medium mt-1">Most Popular</div>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* UPI LITE BALANCE STATE */}
            {tvState === 'upi_lite_balance' && (
              <motion.div
                key="upi_lite"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="glass-card rounded-2xl p-10 max-w-2xl w-full flex flex-col gap-6 items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 mb-2">
                  <Zap size={32} />
                </div>
                <h2 className="text-4xl font-bold text-white">{tvContent?.title}</h2>
                <p className="text-xl text-white/70">{tvContent?.subtitle}</p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 w-full">
                  <div className="text-white/50 text-sm mb-1">On-device UPI Lite Balance</div>
                  <div className="text-4xl font-mono text-yellow-400">₹340</div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <button className="bg-yellow-400 text-black font-bold text-xl py-4 px-12 rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                  <Zap size={20} /> Pay Instantly — No PIN
                </button>
              </motion.div>
            )}

            {/* UPI CIRCLE LIMIT STATE */}
            {tvState === 'upi_circle_limit' && (
              <motion.div
                key="upi_circle"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="glass-card rounded-2xl p-10 max-w-2xl w-full flex flex-col gap-6 items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
                  <CircleDot size={32} />
                </div>
                <h2 className="text-4xl font-bold text-white">{tvContent?.title}</h2>
                <p className="text-xl text-white/70">{tvContent?.subtitle}</p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 w-full flex justify-between items-center">
                  <div className="text-left">
                    <div className="text-white/50 text-sm">Delegated by</div>
                    <div className="text-white font-semibold">Dad (Rahul)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/50 text-sm">Monthly Limit</div>
                    <div className="text-2xl font-mono text-blue-400">₹500</div>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <button className="bg-blue-500 text-white font-bold text-xl py-4 px-12 rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                  <CircleDot size={20} /> Pay via UPI Circle
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
        
        {/* Helper text overlay */}
        <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur text-white/50 text-xs px-3 py-1.5 rounded-full pointer-events-none">
          Click screen to advance step
        </div>

        {/* AI Trigger Button */}
        {!aiPhase && onAITrigger && (
          <button
            onClick={(e) => { e.stopPropagation(); onAITrigger(); }}
            className="absolute bottom-6 left-8 flex items-center gap-2 bg-white/8 hover:bg-primary/20 border border-white/15 hover:border-primary/40 text-white/60 hover:text-primary px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group"
          >
            <Mic size={16} className="group-hover:animate-pulse" />
            Ask Jio AI
          </button>
        )}

        {/* AI Overlay */}
        <AnimatePresence>
          {aiPhase && onAIDismiss && onAIExecute && onAIShowAllOptions && (
            <AIOverlay
              phase={aiPhase}
              scenarioId={scenarioId}
              onDismiss={onAIDismiss}
              onExecute={onAIExecute}
              onShowAllOptions={onAIShowAllOptions}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
