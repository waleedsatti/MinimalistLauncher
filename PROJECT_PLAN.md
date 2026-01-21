# MinimalistLauncher - Project Plan

> **Mission:** Help people break phone addiction with a beautiful, powerful minimalist launcher.

---

## Killer Features

### 1. Minimal Home Screen
- **Only 5 apps visible** on home screen
- Swipe up to access all apps (hidden by default)
- Text-only design (no icons)
- Large clock display

### 2. Focus Modes

| Mode | What's Allowed | Everything Else |
|------|---------------|-----------------|
| **Emergency Only** | Phone, SMS, Contacts | BLOCKED |
| **Work Mode** | Phone, SMS, Email, Calendar, Slack, Notes | BLOCKED |
| **Reading Mode** | Kindle, Audible, Pocket, PDF readers | BLOCKED |
| **Sleep Mode** | Alarm only | BLOCKED |
| **Custom Mode** | You choose | BLOCKED |

One tap to activate. One tap to deactivate.

### 3. App Blocking

- **Block any app** for a set time (30 min, 1 hour, 2 hours, until tomorrow)
- **Daily time limits** - "Only 30 minutes of Instagram per day"
- **Opening limits** - "Only open TikTok 5 times per day"
- **Delay opening** - 5 second wait before addictive apps open
- **Break Glass** - Emergency unlock requires typing a phrase

### 4. Usage Stats

- See total screen time today/this week
- Per-app breakdown
- "Time saved" vs average user
- Streak counter (days meeting your goals)

### 5. Grayscale Mode

- One toggle to make entire phone black & white
- Removes dopamine triggers from colorful apps
- Can auto-enable during Focus Modes

### 6. Daily Intention

- **Morning prompt:** "What's ONE thing that if you achieved today, you'd feel great?"
- **Always visible** on home screen under the clock
- **Evening check-in:** "How did it go?" (Complete / Partial / Didn't do it)
- **History view:** See all past intentions and outcomes
- **Streak tracking:** How many days you completed your intention
- **Weekly review:** See your wins from the past week

**Flow:**
```
┌─────────────────────────────────────┐
│  MORNING                            │
│  "What's ONE thing that if you      │
│   achieved today, you'd feel great?"│
│                                     │
│  [____________________________]     │
│                          [Save]     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│           14:32                     │
│    Wednesday, January 21            │
│                                     │
│   "Finish the project proposal"     │  ← Visible all day
│                                     │
│      Phone  SMS  Notes  Music       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  EVENING (8pm)                      │
│  "How did it go?"                   │
│                                     │
│  [✓ Done] [◐ Partial] [✗ Missed]   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  HISTORY                            │
│                                     │
│  Jan 21 ✓ Finish project proposal   │
│  Jan 20 ✓ Call mom                  │
│  Jan 19 ◐ Go to gym                 │
│  Jan 18 ✓ Read 30 pages             │
│                                     │
│  Streak: 🔥 3 days                  │
└─────────────────────────────────────┘
```

This keeps users focused on what matters most - not their phone.

### 7. Accountability Partner

Add a friend who can see your progress. Gentle social pressure that actually works.

**What your partner sees:**
```
┌─────────────────────────────────────┐
│  SARAH'S PROGRESS TODAY             │
│                                     │
│  📱 Phone-free:     4h 32m          │
│  🚫 No social media: 6h 15m         │
│  ✓ Daily intention: "Go to gym"     │
│                                     │
│  Status: Crushing it today!         │
│                                     │
│  [Send encouragement 💪]            │
└─────────────────────────────────────┘
```

**What you see:**
```
┌─────────────────────────────────────┐
│  YOUR ACCOUNTABILITY PARTNER        │
│                                     │
│  👤 Mike is watching your progress  │
│                                     │
│  Today:                             │
│  📱 Phone-free:     2h 10m          │
│  🚫 No social media: 3h 45m         │
│  ◐ Daily intention: In progress     │
│                                     │
│  Mike says: "You got this! 💪"      │
└─────────────────────────────────────┘
```

**Features:**
- Invite a friend via link/SMS
- See each other's real-time progress
- Send encouragement messages
- Get notified when partner achieves daily goal
- Weekly summary shared between partners
- Optional: Multiple partners (small group)

**Why this goes viral:**
1. **Requires invites** → Friend downloads app to be your partner
2. **Daily check-ins** → Both users open app regularly
3. **Emotional connection** → People stick with apps that connect them
4. **Actually works** → Social accountability is proven to change behavior
5. **Shareable moments** → "My partner hit 8 hours phone-free!"

---

## Development Phases

### Phase 1: Core (Weeks 1-2)
- [ ] 5-app home screen limit
- [ ] Swipe up for all apps
- [ ] Daily Intention (morning prompt + home screen display)

### Phase 2: Blocking (Weeks 3-4)
- [ ] Emergency Only mode
- [ ] App blocking with timer
- [ ] Break Glass unlock

### Phase 3: Focus Modes (Weeks 5-6)
- [ ] Work Mode & Reading Mode
- [ ] Daily time limits per app
- [ ] Evening check-in for Daily Intention

### Phase 4: Intelligence (Weeks 7-8)
- [ ] Usage statistics dashboard
- [ ] Intention history & streaks
- [ ] Grayscale mode toggle

### Phase 5: Social (Weeks 9-10)
- [ ] Accountability Partner - invite friend
- [ ] Real-time progress sharing
- [ ] Send encouragement messages
- [ ] Partner notifications

### Phase 6: Polish (Weeks 11-12)
- [ ] Sleep Mode with scheduling
- [ ] Custom Mode builder
- [ ] Share stats to social media
- [ ] Weekly review of intentions

---

## Tech Stack

- React Native (current)
- AsyncStorage for data
- Native Android modules for:
  - App blocking overlay
  - Usage stats access
  - Grayscale system setting

---

## Why This Will Go Viral

1. **Free** - Competitors charge $5-10/month
2. **Actually blocks apps** - Real friction, not just tracking
3. **Beautiful** - Screenshot-worthy minimal design
4. **Shareable stats** - Users show off their "time saved"
5. **Daily Intention** - Turns your phone into a productivity tool
6. **Accountability Partner** - Forces invites = organic growth loop
7. **Solves real pain** - Phone addiction is epidemic

---

## Target Users

- Students during exams
- Remote workers needing focus
- Anyone doing "digital detox"
- Parents (for kids' phones)
- Productivity enthusiasts

---

*Let's build this.*
