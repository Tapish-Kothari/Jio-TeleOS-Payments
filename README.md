# Jio TeleOS — Payments Demo

An interactive prototype demonstrating Jio's vision for a unified payments experience across TV, phone, and AI — built for the Jio product interview.

**Live demo:** https://jio-teleos-payments.vercel.app
**GitHub:** https://github.com/Tapish-Kothari/Jio-TeleOS-Payments

---

## What it demonstrates

A dual-screen mockup (TV + phone) that walks through 8 payment scenarios, each showing how a frictionless payment flow would work on Jio's TeleOS platform.

### Scenarios

| Scenario | User | Amount | Key idea |
|---|---|---|---|
| **IPL Live Gate** | Impulse buyer | ₹49 | Wallet pays in 1 tap; no phone needed during match |
| **OTT Subscription** | Account owner | ₹999/yr | Branching by 5 payment methods; recurring mandate for UPI |
| **Gaming Top-up** | Teenager | ₹50 | Micro-transaction via wallet — zero cross-device friction |
| **T-Commerce** | Active watcher | ₹1,299 | TV ad → JioMart cart pre-loaded on phone → pay |
| **JioSaavn Pro** | Active watcher | ₹99/mo | Monthly subscription with wallet / postpaid / card branches |
| **Subscription Hub** | Account owner | ₹49/mo | Total household OTT spend (₹2,516/mo) + win-back offer |
| **Mobile Recharge** | Account owner | ₹299 | Within-Jio-ecosystem recharge; wallet as default |
| **Family Auth** | Parent approving teen | ₹499 | Parent approves + pays in one phone action |

### Payment methods (per scenario)

Every scenario branches by payment method at the point of purchase:
- **JioPay Wallet** — default for micro-transactions and impulse flows
- **Jio Postpaid Billing** — zero friction; added to next bill
- **Saved Card (...4242)** — OTP to phone
- **UPI / QR** — cross-device scan
- **Add New Card** — tap-to-add or manual entry

### Jio AI (voice-triggered)

Each scenario has an "Ask Jio AI" button that simulates a voice command:
1. **Listening** → animated waveform
2. **Processing** → AI searches for context (match pass, product, plan)
3. **Response** → conversational payment chips tailored to the scenario

The AI suggests the 3 most relevant payment options inline. Selecting one navigates directly to that payment branch — no extra screens. "See all payment options" falls back to the full payment method selector.

For T-Commerce: during the AI response phase, the phone pre-loads the JioMart cart (product + delivery address) so the user can pay without typing anything.

---

## Tech stack

- **Frontend:** React 19 + TypeScript + Vite 7
- **Styling:** Tailwind CSS 4 (dark glassmorphism theme)
- **Animation:** Framer Motion
- **Backend:** Express (dev server only; no API routes — static deploy)
- **Hosting:** Vercel (static)
- **Repo:** GitHub — `Tapish-Kothari/Jio-TeleOS-Payments`

---

## Running locally

```bash
npm install
PORT=3333 npm run dev
```

Open `http://localhost:3333`.

## Key files

```
client/src/
  lib/scenarios.ts          # All scenario/step definitions + BRANCHES map
  pages/Home.tsx            # Main orchestration — state, branching, AI handlers
  components/TVFrame.tsx    # TV mockup + payment method selector + AI trigger
  components/PhoneFrame.tsx # Phone mockup + all phone states (jiomart_cart etc.)
  components/AIOverlay.tsx  # AI chat overlay with payment chips
  components/ConnectionArc  # Animated TV↔phone handoff indicator
```
