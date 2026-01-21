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

---

## Development Phases

### Phase 1: Core (Weeks 1-2)
- [ ] 5-app home screen limit
- [ ] Swipe up for all apps
- [ ] Emergency Only mode

### Phase 2: Blocking (Weeks 3-4)
- [ ] App blocking with timer
- [ ] Work Mode & Reading Mode
- [ ] Break Glass unlock

### Phase 3: Intelligence (Weeks 5-6)
- [ ] Daily time limits per app
- [ ] Usage statistics dashboard
- [ ] Grayscale mode toggle

### Phase 4: Polish (Weeks 7-8)
- [ ] Sleep Mode with scheduling
- [ ] Custom Mode builder
- [ ] Share stats to social media

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
5. **Solves real pain** - Phone addiction is epidemic

---

## Target Users

- Students during exams
- Remote workers needing focus
- Anyone doing "digital detox"
- Parents (for kids' phones)
- Productivity enthusiasts

---

*Let's build this.*
