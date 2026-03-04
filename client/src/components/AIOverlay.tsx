import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Wallet, CreditCard, Smartphone, QrCode, Receipt, ArrowRight } from 'lucide-react';

export type AIPhase = 'listening' | 'processing' | 'response';

// ── Per-scenario AI chat config ──────────────────────────────────────────────
const AI_CONFIG: Record<string, { query: string; thinking: string; response: string }> = {
  't-commerce': {
    query: 'I want to purchase this',
    thinking: 'Searching JioMart for matching products...',
    response: "Found it! Professional Chef Knife Set (5pc) — ₹1,299. Cart is open on your phone with delivery address pre-filled. How would you like to pay?",
  },
  'ipl-live': {
    query: 'Get me the IPL match pass',
    thinking: 'Checking match pass availability for CSK vs MI...',
    response: "Match pass is ₹49. You're currently on a free preview — let's get you back to the game fast. How would you like to pay?",
  },
  'gaming': {
    query: 'Top up my JioCoins',
    thinking: 'Fetching your JioCoins balance...',
    response: "You need 500 JioCoins for this car — that's ₹50. How would you like to pay?",
  },
  'ott-sub': {
    query: 'I want to watch this show',
    thinking: 'Checking your subscription status for this content...',
    response: "Stranger Things needs the Premium plan — ₹999/yr (₹83/mo). That's 40% cheaper than comparable international plans. How would you like to subscribe?",
  },
  'jiosaavn': {
    query: 'Can you turn off the ads?',
    thinking: 'Looking up your JioSaavn plan...',
    response: "JioSaavn Pro removes all ads and unlocks offline downloads — ₹99/mo. How would you like to set up the subscription?",
  },
  'sub-hub': {
    query: 'Am I overspending on subscriptions?',
    thinking: 'Analyzing your household OTT spend...',
    response: "You're spending ₹2,516/mo across 4 services. Hotstar has a win-back offer at ₹49/mo (was ₹149). How would you like to claim it?",
  },
  'mobile-recharge': {
    query: "Recharge Mom's number",
    thinking: 'Fetching saved numbers and recommended plans...',
    response: "Mom's +91 98765 43210 — best plan is ₹299 (28 days, unlimited calls + 2GB/day). How would you like to pay?",
  },
  'family-auth': {
    query: "Aarav wants to buy something",
    thinking: 'Checking pending purchase requests...',
    response: "Aarav wants Minecraft (₹499). Family limit: ₹2,000/mo — you have ₹1,501 remaining. How would you like to approve and pay?",
  },
};

const DEFAULT_CONFIG = {
  query: 'Help me with this',
  thinking: 'Processing your request...',
  response: "Done! How would you like to pay?",
};

// ── Payment suggestions per scenario (3 options, most-relevant first) ────────
type Suggestion = { method: string; label: string; detail: string; icon: string };

const SUGGESTIONS: Record<string, Suggestion[]> = {
  't-commerce': [
    { method: 'wallet',     label: 'Pay from JioPay Wallet',       detail: 'Balance ₹1,500 · Done in 1 tap, no phone',   icon: 'wallet' },
    { method: 'saved_card', label: 'Charge saved card (...4242)',   detail: 'HDFC Bank · OTP sent to your phone',         icon: 'card' },
    { method: 'upi',        label: 'Send me a payment link',        detail: 'JioMart cart already open on your phone',    icon: 'phone' },
  ],
  'ipl-live': [
    { method: 'wallet',     label: 'Pay from JioPay Wallet',        detail: 'Balance ₹1,500 · Back to match in seconds',  icon: 'wallet' },
    { method: 'postpaid',   label: 'Add to my Jio bill',            detail: '₹49 this cycle · Zero friction',             icon: 'bill' },
    { method: 'upi',        label: 'Send me a payment link',        detail: 'Approve on your phone via any UPI app',      icon: 'phone' },
  ],
  'gaming': [
    { method: 'wallet',     label: 'Pay from JioPay Wallet',        detail: 'Balance ₹1,500 · Best for micro-payments',   icon: 'wallet' },
    { method: 'postpaid',   label: 'Add to my Jio bill',            detail: '₹50 this cycle · No action needed',          icon: 'bill' },
    { method: 'upi',        label: 'Display a QR code',             detail: 'Scan with any UPI app on your phone',        icon: 'qr' },
  ],
  'ott-sub': [
    { method: 'wallet',     label: 'Pay from JioPay Wallet',        detail: 'Balance ₹1,500 · No phone needed',           icon: 'wallet' },
    { method: 'saved_card', label: 'Charge saved card (...4242)',   detail: 'HDFC Bank · OTP sent to your phone',         icon: 'card' },
    { method: 'postpaid',   label: 'Add to my Jio bill',            detail: '₹999 this billing cycle',                    icon: 'bill' },
  ],
  'jiosaavn': [
    { method: 'wallet',     label: 'Set up Wallet AutoPay',         detail: 'Balance ₹1,500 · Auto-renews monthly',       icon: 'wallet' },
    { method: 'postpaid',   label: 'Add to my Jio bill',            detail: '₹99/mo on your postpaid bill',               icon: 'bill' },
    { method: 'saved_card', label: 'Charge saved card (...4242)',   detail: 'HDFC Bank · Recurring monthly charge',       icon: 'card' },
  ],
  'sub-hub': [
    { method: 'wallet',     label: 'Pay from JioPay Wallet',        detail: 'Balance ₹1,500 · Instant confirmation',      icon: 'wallet' },
    { method: 'postpaid',   label: 'Add to my Jio bill',            detail: '₹49/mo from next billing cycle',             icon: 'bill' },
    { method: 'saved_card', label: 'Charge saved card (...4242)',   detail: 'HDFC Bank · OTP sent to your phone',         icon: 'card' },
  ],
  'mobile-recharge': [
    { method: 'wallet',     label: 'Pay from JioPay Wallet',        detail: 'Balance ₹1,500 · Instant recharge',          icon: 'wallet' },
    { method: 'postpaid',   label: 'Add to my Jio bill',            detail: '₹299 this billing cycle',                    icon: 'bill' },
    { method: 'upi',        label: 'Display a QR code',             detail: 'Scan with any UPI app on your phone',        icon: 'qr' },
  ],
  'family-auth': [
    { method: 'wallet',     label: 'Approve & pay from Wallet',     detail: 'Balance ₹1,500 · Instant approval',          icon: 'wallet' },
    { method: 'saved_card', label: 'Approve & charge (...4242)',    detail: 'HDFC Bank · OTP to your phone',              icon: 'card' },
    { method: 'upi',        label: 'Approve & display QR',          detail: 'Scan with any UPI app',                      icon: 'qr' },
  ],
};

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { method: 'wallet',     label: 'Pay from JioPay Wallet',        detail: 'Balance ₹1,500 · No phone needed',   icon: 'wallet' },
  { method: 'saved_card', label: 'Charge saved card (...4242)',   detail: 'HDFC Bank · OTP on phone',           icon: 'card' },
  { method: 'upi',        label: 'Display a QR code',             detail: 'Scan with any UPI app',              icon: 'qr' },
];

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  wallet: Wallet,
  card:   CreditCard,
  phone:  Smartphone,
  qr:     QrCode,
  bill:   Receipt,
};

// Deterministic waveform heights
const BAR_HEIGHTS = [20, 40, 28, 52, 32, 60, 24, 48, 36, 56, 20, 44, 32, 52, 28];

interface AIOverlayProps {
  phase: AIPhase;
  scenarioId: string;
  onDismiss: () => void;
  onExecute: (method: string) => void;
  onShowAllOptions: () => void;
}

export default function AIOverlay({ phase, scenarioId, onDismiss, onExecute, onShowAllOptions }: AIOverlayProps) {
  const config    = AI_CONFIG[scenarioId]  || DEFAULT_CONFIG;
  const suggestions = SUGGESTIONS[scenarioId] || DEFAULT_SUGGESTIONS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/82 backdrop-blur-md rounded-[20px] flex flex-col items-center justify-center gap-8 px-24 py-16"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Waveform */}
      <div className="flex items-center gap-5">
        <Mic className={`w-10 h-10 transition-colors ${phase === 'listening' ? 'text-primary animate-pulse' : 'text-primary/40'}`} />
        <div className="flex items-end gap-1.5">
          {BAR_HEIGHTS.map((maxH, i) => (
            <motion.div
              key={i}
              className="w-2 bg-primary rounded-full origin-bottom"
              animate={
                phase === 'listening'  ? { height: [`8px`, `${maxH}px`, `8px`] } :
                phase === 'processing' ? { height: [`6px`, `${Math.round(maxH * 0.35)}px`, `6px`] } :
                                         { height: `4px` }
              }
              transition={{
                duration: phase === 'listening' ? 0.45 + (i % 4) * 0.08 : 0.9,
                repeat: phase !== 'response' ? Infinity : 0,
                delay: i * 0.04,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <span className="ml-3 text-2xl font-semibold text-white/80 tracking-wide">
          {phase === 'listening' ? 'Listening...' : phase === 'processing' ? 'Thinking...' : 'Jio AI'}
        </span>
      </div>

      {/* Chat bubbles */}
      <div className="w-full max-w-3xl space-y-5">
        {/* User query */}
        <AnimatePresence>
          {(phase === 'processing' || phase === 'response') && (
            <motion.div key="query" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
              <div className="bg-white/15 border border-white/25 rounded-2xl rounded-tr-sm px-7 py-4 max-w-xl">
                <p className="text-white text-xl">"{config.query}"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI thinking / response */}
        <AnimatePresence mode="wait">
          {phase === 'processing' && (
            <motion.div key="thinking" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm shrink-0">AI</div>
              <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-sm px-7 py-4 flex items-center gap-3">
                {[0, 0.18, 0.36].map((delay, i) => (
                  <motion.div key={i} className="w-3 h-3 bg-primary/60 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -7, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay }}
                  />
                ))}
                <span className="text-white/55 text-lg ml-2">{config.thinking}</span>
              </div>
            </motion.div>
          )}

          {phase === 'response' && (
            <motion.div key="response" initial={{ opacity: 0, x: -40, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm shrink-0 mt-1">AI</div>
              <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-sm px-7 py-5 flex-1">
                <p className="text-white text-xl leading-relaxed">{config.response}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Payment option chips — staggered in after response */}
      <AnimatePresence>
        {phase === 'response' && (
          <motion.div key="chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-3xl space-y-3">
            {suggestions.map((s, i) => {
              const Icon = ICON_MAP[s.icon] || Wallet;
              return (
                <motion.button
                  key={s.method}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.12 }}
                  onClick={() => onExecute(s.method)}
                  className="w-full flex items-center gap-5 px-7 py-4 rounded-2xl border border-white/12 bg-white/5 hover:bg-primary/15 hover:border-primary/50 hover:shadow-[0_0_16px_rgba(0,230,255,0.15)] transition-all duration-200 group text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-white/8 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={22} className="text-white/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-lg font-medium group-hover:text-primary transition-colors">{s.label}</div>
                    <div className="text-white/45 text-base mt-0.5">{s.detail}</div>
                  </div>
                  <ArrowRight size={20} className="text-white/25 group-hover:text-primary/70 shrink-0 transition-colors" />
                </motion.button>
              );
            })}

            {/* Fallback + dismiss row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + suggestions.length * 0.12 + 0.1 }}
              className="flex items-center justify-between pt-2 px-2"
            >
              <button
                onClick={onShowAllOptions}
                className="text-white/40 hover:text-white/70 text-base underline underline-offset-4 transition-colors"
              >
                See all payment options
              </button>
              <button
                onClick={onDismiss}
                className="flex items-center gap-2 text-white/30 hover:text-white/60 text-base transition-colors"
              >
                <X size={16} /> Dismiss
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
