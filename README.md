# Minimalist Launcher

**Break your phone addiction. Reclaim your time.**

A clean, distraction-free Android launcher built with React Native. Designed to help you use your phone intentionally, not compulsively.

> **We're building the most powerful minimalist launcher.** See our [ROADMAP.md](ROADMAP.md) for upcoming features including Focus Modes, App Blocking, and Screen Time limits.

## Current Features

- **Large Clock & Date Display** - Always know the time at a glance
- **Text-Based App List** - Simple, alphabetically sorted list of all your apps
- **Quick Access Favorites** - Pin up to 6 frequently used apps at the top
- **App Usage Tracking** - See how many times you've opened each app
- **Smart Search** - Quickly find apps by typing
- **Minimalist Design** - Pure black background with white text for OLED screens

## Screenshots

[Your launcher will look like this:]
- Large centered clock at the top
- Date displayed below clock
- Quick Access section with your favorite apps
- Search bar for filtering
- Scrollable list of all installed apps
- Usage counter for each app

## Setup & Installation

### Prerequisites

- Node.js (v18 or later)
- React Native development environment set up
- Android SDK
- Android device or emulator

### Build Instructions

1. **Navigate to the project directory:**
   ```bash
   cd MinimalistLauncher
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Metro bundler:**
   ```bash
   npm start
   ```

4. **In a new terminal, run on Android:**
   ```bash
   npm run android
   ```

5. **Set as default launcher:**
   - Press home button on your device
   - Android will ask you to choose a launcher
   - Select "MinimalistLauncher" and choose "Always"

## Usage

### Opening Apps
- **Tap** on any app name to launch it

### Managing Favorites
- **Long press** on any app to add it to Quick Access (favorites)
- **Long press** on a favorite to remove it from Quick Access
- You can have up to 6 favorites

### Searching Apps
- Type in the search bar to filter apps by name
- Search is case-insensitive

### App Usage Stats
- Each app shows how many times you've opened it
- Counter increments every time you launch an app
- Stats are persisted locally using AsyncStorage

## Project Structure

```
MinimalistLauncher/
├── App.tsx                          # Main launcher UI
├── android/
│   └── app/src/main/
│       ├── AndroidManifest.xml      # Launcher permissions & intents
│       └── java/com/minimalistlauncher/
│           ├── RNInstalledApplicationModule.java    # Native module for app management
│           └── RNInstalledApplicationPackage.java   # Package registration
├── package.json
└── README.md
```

## Permissions

The launcher requires these permissions:

- `QUERY_ALL_PACKAGES` - To list all installed apps
- `PACKAGE_USAGE_STATS` - To track app usage (optional, for future features)

## Customization

### Changing Colors
Edit the `styles` object in `App.tsx`:
- `backgroundColor: '#000000'` - Background color
- `color: '#FFFFFF'` - Text color
- `color: '#999999'` - Secondary text color

### Changing Maximum Favorites
In `App.tsx`, find this line:
```typescript
if (newFavorites.length < 6) {
```
Change `6` to your desired maximum.

### Clock Format
The launcher uses 24-hour format. To change to 12-hour format, modify the `formatTime` function in `App.tsx`.

## Troubleshooting

### Apps not showing up
- Make sure you've granted the QUERY_ALL_PACKAGES permission
- Try restarting the app

### Can't launch apps
- Check that the native module is properly registered
- Verify AndroidManifest.xml has the correct launcher intents

### Home button doesn't show launcher selection
- Make sure the HOME and DEFAULT categories are in your intent-filter
- Try clearing default launcher settings in Android settings

## Building for Production

1. **Generate a release APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **Find your APK at:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

3. **Sign the APK** (required for distribution)

## Roadmap - Coming Soon

We're building powerful features to help you break phone addiction:

- **Focus Modes** - Emergency Only, Work Mode, Reading Mode, Sleep Mode
- **App Blocking** - Block distracting apps for set periods
- **Screen Time Limits** - Set daily limits per app
- **Usage Dashboard** - See exactly where your time goes
- **Grayscale Mode** - Remove color to reduce appeal
- **5-App Home Screen** - Show only what matters

**[See Full Roadmap](ROADMAP.md)** for all planned features and development timeline.

## Tech Stack

- React Native 0.83.1
- TypeScript
- AsyncStorage for local data persistence
- Native Android modules for app management

## License

MIT

## Contributing

Feel free to submit issues and pull requests!

---

Built with React Native
