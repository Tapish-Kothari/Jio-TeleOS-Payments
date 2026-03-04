export type TVState = 
  | 'idle' 
  | 'content_playing' 
  | 'paywall' 
  | 'payment_methods' 
  | 'qr_code' 
  | 'waiting' 
  | 'success' 
  | 'subscription_hub' 
  | 'recharge_select'
  | 'wallet_confirm'
  | 'postpaid_confirm'
  | 'saved_card_confirm'
  | 'qr_code_new_card';

export type PhoneState = 
  | 'idle' 
  | 'notification' 
  | 'upi_pin' 
  | 'family_auth' 
  | 'success'
  | 'otp_entry'
  | 'add_card_options'
  | 'add_card_tap'
  | 'add_card_manual';

export interface Step {
  tvState: TVState;
  phoneState: PhoneState;
  tvContent?: {
    title?: string;
    subtitle?: string;
    price?: string;
    img?: string;
  };
  phoneContent?: {
    title?: string;
    subtitle?: string;
    amount?: string;
  };
  handoffActive?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  icon: string;
  steps: Step[];
}

export const OTT_BRANCHES: Record<string, Step[]> = {
  upi: [
    { tvState: 'qr_code', phoneState: 'idle', tvContent: { title: 'Scan to Pay ₹999', subtitle: 'Annual Subscription' }, handoffActive: true },
    { tvState: 'waiting', phoneState: 'upi_pin', phoneContent: { amount: '₹999' }, handoffActive: true },
    { tvState: 'success', phoneState: 'success', tvContent: { title: 'Payment Successful', subtitle: 'Your subscription is now active' } },
  ],
  wallet: [
    { tvState: 'wallet_confirm', phoneState: 'idle', tvContent: { title: 'Pay from Wallet', subtitle: 'Pay ₹999 from JioPay Wallet?', price: 'Balance: ₹1,500' } },
    { tvState: 'success', phoneState: 'idle', tvContent: { title: 'Payment Successful', subtitle: 'Your subscription is now active' } },
  ],
  postpaid: [
    { tvState: 'postpaid_confirm', phoneState: 'idle', tvContent: { title: 'Add to Jio Bill', subtitle: 'Add ₹999 to your next Jio postpaid bill?' } },
    { tvState: 'success', phoneState: 'idle', tvContent: { title: 'Payment Successful', subtitle: 'Will appear on next bill' } },
  ],
  saved_card: [
    { tvState: 'saved_card_confirm', phoneState: 'notification', tvContent: { title: 'Pay via Saved Card', subtitle: 'HDFC Bank ending in 4242' }, phoneContent: { title: 'HDFC Bank', subtitle: 'OTP for Jio TeleOS: ₹999' }, handoffActive: true },
    { tvState: 'waiting', phoneState: 'otp_entry', phoneContent: { title: 'Enter OTP', subtitle: 'Sent to your registered mobile', amount: '₹999' }, handoffActive: true },
    { tvState: 'success', phoneState: 'success', tvContent: { title: 'Payment Successful', subtitle: 'Your subscription is now active' } },
  ],
  new_card: [
    { tvState: 'qr_code_new_card', phoneState: 'idle', tvContent: { title: 'Add New Card', subtitle: 'Scan from phone to add card' }, handoffActive: true },
    { tvState: 'waiting', phoneState: 'add_card_options', phoneContent: { title: 'Add Card', subtitle: 'Choose how to add' }, handoffActive: true },
    { tvState: 'waiting', phoneState: 'add_card_tap', phoneContent: { title: 'Tap Card', subtitle: 'Hold card to back of phone' }, handoffActive: true }, 
    { tvState: 'waiting', phoneState: 'add_card_manual', phoneContent: { title: 'Enter Details', subtitle: 'Type card information' }, handoffActive: true }, 
    { tvState: 'success', phoneState: 'success', tvContent: { title: 'Payment Successful', subtitle: 'Card saved & payment complete' } },
  ]
};

export const SCENARIOS: Scenario[] = [
  {
    id: 'ipl-live',
    title: 'IPL Live Gate',
    icon: 'Cricket',
    steps: [
      { tvState: 'content_playing', phoneState: 'idle', tvContent: { title: 'CSK vs MI - Live', subtitle: 'Free preview ending soon' } },
      { tvState: 'paywall', phoneState: 'idle', tvContent: { title: 'Continue Watching', subtitle: 'Buy match pass to keep watching', price: '₹49' } },
      { tvState: 'qr_code', phoneState: 'idle', tvContent: { title: 'Scan to Pay ₹49', subtitle: 'Open any UPI app' }, handoffActive: true },
      { tvState: 'waiting', phoneState: 'notification', phoneContent: { title: 'JioPay Request', subtitle: 'Pay ₹49 for IPL Match Pass', amount: '₹49' } },
      { tvState: 'waiting', phoneState: 'upi_pin' },
      { tvState: 'success', phoneState: 'success', tvContent: { title: 'Payment Successful', subtitle: 'Enjoy the match!' } },
    ]
  },
  {
    id: 'ott-sub',
    title: 'OTT Subscription',
    icon: 'Film',
    steps: [
      { tvState: 'content_playing', phoneState: 'idle', tvContent: { title: 'Stranger Things', subtitle: 'Premium Content' } },
      { tvState: 'paywall', phoneState: 'idle', tvContent: { title: 'Premium Plan Required', subtitle: 'Get unlimited access to all movies and shows', price: '₹999/yr' } },
      { tvState: 'payment_methods', phoneState: 'idle', tvContent: { title: 'Select Payment Method' } },
      { tvState: 'qr_code', phoneState: 'idle', tvContent: { title: 'Scan to Pay ₹999', subtitle: 'Annual Subscription' }, handoffActive: true },
      { tvState: 'waiting', phoneState: 'upi_pin', phoneContent: { amount: '₹999' } },
      { tvState: 'success', phoneState: 'success', tvContent: { title: 'Welcome to Premium', subtitle: 'Your subscription is now active' } },
    ]
  },
  {
    id: 'gaming',
    title: 'Gaming Top-up',
    icon: 'Gamepad2',
    steps: [
      { tvState: 'content_playing', phoneState: 'idle', tvContent: { title: 'Asphalt 9', subtitle: 'Cloud Gaming' } },
      { tvState: 'paywall', phoneState: 'idle', tvContent: { title: 'Low Wallet Balance', subtitle: 'You need 500 JioCoins to purchase this car', price: '₹50' } },
      { tvState: 'qr_code', phoneState: 'idle', tvContent: { title: 'Top-up 500 Coins', subtitle: 'Scan with JioPay' }, handoffActive: true },
      { tvState: 'waiting', phoneState: 'upi_pin', phoneContent: { amount: '₹50' } },
      { tvState: 'success', phoneState: 'success', tvContent: { title: 'Top-up Successful', subtitle: '500 JioCoins added' } },
    ]
  },
  {
    id: 'family-auth',
    title: 'Family Auth',
    icon: 'Users',
    steps: [
      { tvState: 'paywall', phoneState: 'idle', tvContent: { title: 'Minecraft (Kids Profile)', subtitle: 'Buy Full Game', price: '₹499' } },
      { tvState: 'waiting', phoneState: 'idle', tvContent: { title: 'Asking for Permission', subtitle: 'A request has been sent to the family manager.' }, handoffActive: true },
      { tvState: 'waiting', phoneState: 'family_auth', phoneContent: { title: 'Purchase Request', subtitle: 'Aarav wants to buy Minecraft', amount: '₹499' } },
      { tvState: 'waiting', phoneState: 'upi_pin', phoneContent: { amount: '₹499' } },
      { tvState: 'success', phoneState: 'success', tvContent: { title: 'Purchase Approved', subtitle: 'Downloading Minecraft...' } },
    ]
  },
  {
    id: 't-commerce',
    title: 'T-Commerce',
    icon: 'ShoppingBag',
    steps: [
      { tvState: 'content_playing', phoneState: 'idle', tvContent: { title: 'MasterChef', subtitle: 'Sponsored by JioMart' } },
      { tvState: 'paywall', phoneState: 'idle', tvContent: { title: 'Shop the Look', subtitle: 'Professional Chef Knife Set', price: '₹1,299' } },
      { tvState: 'qr_code', phoneState: 'idle', tvContent: { title: 'Buy Now', subtitle: 'Scan to order via JioMart' }, handoffActive: true },
      { tvState: 'waiting', phoneState: 'upi_pin', phoneContent: { amount: '₹1,299' } },
      { tvState: 'success', phoneState: 'success', tvContent: { title: 'Order Placed!', subtitle: 'Delivery expected tomorrow' } },
    ]
  },
  {
    id: 'jiosaavn',
    title: 'JioSaavn Pro',
    icon: 'Music',
    steps: [
      { tvState: 'content_playing', phoneState: 'idle', tvContent: { title: 'Top Hits 2026', subtitle: 'Ad-free listening' } },
      { tvState: 'payment_methods', phoneState: 'idle', tvContent: { title: 'Upgrade to Pro', subtitle: 'No ads, unlimited downloads', price: '₹99/mo' } },
      { tvState: 'qr_code', phoneState: 'idle', tvContent: { title: 'Subscribe', subtitle: 'Set up Auto-pay via UPI' }, handoffActive: true },
      { tvState: 'waiting', phoneState: 'upi_pin', phoneContent: { amount: '₹99' } },
      { tvState: 'success', phoneState: 'success', tvContent: { title: 'Pro Activated', subtitle: 'Enjoy ad-free music' } },
    ]
  },
  {
    id: 'sub-hub',
    title: 'Subscription Hub',
    icon: 'Layers',
    steps: [
      { tvState: 'subscription_hub', phoneState: 'idle', tvContent: { title: 'My Subscriptions' } },
      { tvState: 'paywall', phoneState: 'idle', tvContent: { title: 'Cancel Hotstar?', subtitle: 'Special Offer: Keep it for ₹49/mo instead of ₹149/mo', price: '₹49/mo' } },
      { tvState: 'qr_code', phoneState: 'idle', tvContent: { title: 'Claim Offer', subtitle: 'Scan to update plan' }, handoffActive: true },
      { tvState: 'waiting', phoneState: 'upi_pin', phoneContent: { amount: '₹49' } },
      { tvState: 'success', phoneState: 'success', tvContent: { title: 'Plan Updated', subtitle: 'Offer applied successfully' } },
    ]
  },
  {
    id: 'mobile-recharge',
    title: 'Mobile Recharge',
    icon: 'Smartphone',
    steps: [
      { tvState: 'recharge_select', phoneState: 'idle', tvContent: { title: 'Recharge Mobile', subtitle: 'Select a saved number' } },
      { tvState: 'payment_methods', phoneState: 'idle', tvContent: { title: 'Popular Plans', subtitle: 'For +91 98765 43210', price: '₹299' } },
      { tvState: 'qr_code', phoneState: 'idle', tvContent: { title: 'Recharge for ₹299', subtitle: 'Scan to pay' }, handoffActive: true },
      { tvState: 'waiting', phoneState: 'upi_pin', phoneContent: { amount: '₹299' } },
      { tvState: 'success', phoneState: 'success', tvContent: { title: 'Recharge Successful', subtitle: 'Benefits are now active' } },
    ]
  }
];
