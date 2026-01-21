# MinimalistLauncher Roadmap

> **Goal:** Build the most powerful minimalist launcher that helps users break phone addiction and reclaim their time.

---

## Vision

Transform MinimalistLauncher into the go-to app for digital wellness, combining beautiful minimalist design with powerful focus tools. Target the growing market of people seeking to reduce screen time and phone addiction.

---

## Phase 1: Core Focus Features (MVP for Virality)

### 1.1 Home Screen Redesign
- [ ] **5-App Limit on Home** - Only show 5 favorite apps on main screen
- [ ] **Swipe Up for All Apps** - Hide the full app list behind a gesture
- [ ] **Remove App Icons** - Text-only interface (current design - keep it!)
- [ ] **Grayscale Mode** - Option to display everything in black & white

### 1.2 App Blocking System
- [ ] **Time-Based Blocking**
  - Block specific apps for X minutes/hours
  - Schedule recurring blocks (e.g., "Block Instagram 9am-5pm on weekdays")
  - "One more minute" option with limited uses per day

- [ ] **Session Blocking**
  - "Block until I finish this task" mode
  - Pomodoro-style focus sessions (25 min work, 5 min break)
  - Block until a specific time

- [ ] **App Limits**
  - Daily time limits per app (e.g., "30 min/day for TikTok")
  - Weekly limits
  - Warning notifications at 80% usage

### 1.3 Focus Modes (Presets)

| Mode | Allowed Apps | Use Case |
|------|-------------|----------|
| **Emergency Only** | Phone, SMS, Contacts | Maximum focus / Digital detox |
| **Work Mode** | Phone, SMS, Email, Calendar, Notes, Slack | Professional productivity |
| **Reading Mode** | Kindle, Audible, Pocket, Apple Books, PDF readers | Learning time |
| **Fitness Mode** | Phone, Music, Podcast, Fitness apps | Workout sessions |
| **Sleep Mode** | Alarm, Phone (emergencies) | Bedtime routine |
| **Custom Mode** | User-defined | Personalized needs |

### 1.4 Quick Settings
- [ ] One-tap activate any Focus Mode from home screen
- [ ] Widget for Focus Mode activation
- [ ] Quick toggle in notification shade

---

## Phase 2: Engagement & Retention Features

### 2.1 Usage Statistics Dashboard
- [ ] Daily/weekly/monthly screen time reports
- [ ] App-by-app breakdown with charts
- [ ] "Time saved" calculator vs. average user
- [ ] Streak tracking (days of meeting goals)
- [ ] Compare this week vs. last week

### 2.2 Gamification
- [ ] **Achievements/Badges**
  - "First Focus Session"
  - "7-Day Streak"
  - "1 Hour Saved Today"
  - "Social Media Free Day"
  - "Night Owl Reformed" (no phone after 10pm)

- [ ] **Challenges**
  - Daily challenges ("Don't open Instagram before noon")
  - Weekly challenges
  - Community challenges

### 2.3 Motivational Features
- [ ] Daily quotes on home screen (optional)
- [ ] Progress towards daily goals shown visually
- [ ] Celebration animations when goals are met
- [ ] "You've saved X hours this month" notifications

---

## Phase 3: Advanced Features

### 3.1 Smart Blocking
- [ ] **Allowlist Contacts** - Always allow calls/texts from specific people
- [ ] **Break Glass** - Emergency override with friction (type phrase to unlock)
- [ ] **Location-Based Modes** - Auto-enable Work Mode at office
- [ ] **Calendar Integration** - Auto-enable Focus Mode during meetings
- [ ] **Bedtime Schedule** - Auto-enable Sleep Mode at set time

### 3.2 App Drawer Enhancements
- [ ] **Hidden Apps** - Completely hide apps you want to forget about
- [ ] **App Renaming** - Rename apps to discourage use ("Time Waster" instead of "TikTok")
- [ ] **Usage Warnings** - Show "You've spent 2h today" before opening app
- [ ] **Delay Opening** - 5-second countdown before addictive apps open
- [ ] **Open Count Limit** - "You can only open this app 5 times today"

### 3.3 Customization
- [ ] **Themes** - Multiple minimalist color schemes
- [ ] **Font Options** - Different typography styles
- [ ] **Clock Styles** - Digital, minimal, hidden
- [ ] **Wallpaper Support** - Simple solid colors or gradients
- [ ] **Icon Packs** - For users who want minimal icons

---

## Phase 4: Social & Viral Features

### 4.1 Share & Compare
- [ ] Share daily/weekly stats card to social media
- [ ] "Focus Mode Active" status for messaging apps
- [ ] Shareable achievement badges
- [ ] Before/after screen time comparisons

### 4.2 Accountability
- [ ] **Accountability Partner** - Share stats with a friend
- [ ] **Family Mode** - Parents can set limits for kids
- [ ] **Couple Mode** - Partners help each other stay focused

### 4.3 Community
- [ ] Public leaderboards (opt-in)
- [ ] Tips & tricks from successful users
- [ ] User-submitted Focus Mode presets

---

## Phase 5: Premium Features (Monetization)

### Free Tier
- 5 apps on home screen
- 2 Focus Modes (Emergency + 1 custom)
- Basic app blocking
- Daily stats

### Premium Tier ($2.99/month or $19.99/year)
- Unlimited Focus Modes
- Advanced scheduling
- Detailed analytics & reports
- Accountability partner feature
- Custom themes
- No ads
- Priority support

---

## Technical Requirements

### Permissions Needed
- `QUERY_ALL_PACKAGES` - List installed apps
- `PACKAGE_USAGE_STATS` - Track app usage time
- `SYSTEM_ALERT_WINDOW` - Show blocking overlay
- `RECEIVE_BOOT_COMPLETED` - Persist settings after restart
- `ACCESS_FINE_LOCATION` - Location-based modes (optional)
- `READ_CALENDAR` - Calendar integration (optional)
- `POST_NOTIFICATIONS` - Usage warnings

### Data Storage
- Local-first (AsyncStorage/SQLite)
- Optional cloud backup
- Export/import settings

### Platform Support
- Android (Primary) - Phase 1-3
- iOS (Secondary) - Phase 4+

---

## Marketing Strategy for Virality

### 1. Target Audience
- Students during exam season
- Remote workers struggling with focus
- Parents concerned about kids' screen time
- People doing "digital detox"
- Productivity enthusiasts

### 2. Key Differentiators
- **Free & Open Source** - Build trust
- **Privacy-First** - No data collection
- **Beautiful Design** - Screenshot-worthy
- **Actually Works** - Real friction, not just tracking

### 3. Launch Strategy
- [ ] Post on r/digitalminimalism, r/nosurf, r/productivity
- [ ] Product Hunt launch
- [ ] YouTube reviews from productivity channels
- [ ] TikTok/Reels showing the "phone transformation"
- [ ] Blog posts about phone addiction

### 4. Viral Mechanics
- Shareable stats cards
- "Made with MinimalistLauncher" watermark on shares
- Referral rewards (unlock themes)
- Challenge friends feature

---

## Development Priority

### Sprint 1 (Week 1-2)
1. 5-app home screen limit
2. Swipe up for all apps
3. Basic Focus Mode (Emergency Only)

### Sprint 2 (Week 3-4)
4. App blocking with timer
5. Reading Mode preset
6. Work Mode preset

### Sprint 3 (Week 5-6)
7. Usage statistics dashboard
8. Daily/weekly time limits
9. Break glass emergency unlock

### Sprint 4 (Week 7-8)
10. Grayscale mode
11. App opening delays
12. Polish & bug fixes

### Sprint 5 (Week 9-10)
13. Share stats feature
14. Achievements system
15. Beta testing & launch prep

---

## Success Metrics

| Metric | Target (Month 1) | Target (Month 6) |
|--------|-----------------|------------------|
| Downloads | 1,000 | 50,000 |
| Daily Active Users | 500 | 25,000 |
| App Store Rating | 4.5+ | 4.7+ |
| Avg Screen Time Reduction | 20% | 30% |

---

## Inspiration & Competitors

- **Minimalist Phone** - Main competitor, paid app
- **Olauncher** - Open source, basic features
- **Before Launcher** - Good blocking features
- **One Sec** - Delay before opening apps
- **Opal** - iOS focus app

**Our Edge:** Combine the best features of all competitors in a free, beautiful, open-source package.

---

## Contributing

We welcome contributions! Priority areas:
1. Focus Mode implementation
2. App blocking system
3. UI/UX improvements
4. Testing on various Android devices

---

*Last Updated: January 2025*
