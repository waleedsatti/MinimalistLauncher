import {FocusModeConfig} from '../types/app.types';

// Common package names for different app categories
export const COMMON_PACKAGES = {
  // Essential communication
  PHONE: 'com.android.dialer',
  PHONE_ALT: 'com.google.android.dialer',
  SMS: 'com.android.mms',
  SMS_ALT: 'com.google.android.apps.messaging',
  CONTACTS: 'com.android.contacts',
  CONTACTS_ALT: 'com.google.android.contacts',

  // Work/Productivity
  EMAIL: 'com.google.android.gm',
  CALENDAR: 'com.google.android.calendar',
  SLACK: 'com.slack',
  TEAMS: 'com.microsoft.teams',
  ZOOM: 'us.zoom.videomeetings',
  NOTION: 'notion.id',
  TODOIST: 'com.todoist',
  TRELLO: 'com.trello',
  DRIVE: 'com.google.android.apps.docs',

  // Reading/Learning
  KINDLE: 'com.amazon.kindle',
  AUDIBLE: 'com.audible.application',
  POCKET: 'com.ideashower.readitlater.pro',
  MEDIUM: 'com.medium.reader',
  FEEDLY: 'com.devhd.feedly',
  GOODREADS: 'com.goodreads',

  // Notes
  NOTES: 'com.google.android.keep',
  ONENOTE: 'com.microsoft.office.onenote',

  // Utilities
  CLOCK: 'com.android.deskclock',
  CLOCK_ALT: 'com.google.android.deskclock',
  ALARM: 'com.android.alarm',
  CALCULATOR: 'com.android.calculator2',
  CAMERA: 'com.android.camera2',

  // Social Media (to block)
  INSTAGRAM: 'com.instagram.android',
  FACEBOOK: 'com.facebook.katana',
  TWITTER: 'com.twitter.android',
  TIKTOK: 'com.zhiliaoapp.musically',
  SNAPCHAT: 'com.snapchat.android',
  WHATSAPP: 'com.whatsapp',
  TELEGRAM: 'org.telegram.messenger',
};

// Preset Focus Modes
export const PRESET_FOCUS_MODES: FocusModeConfig[] = [
  {
    id: 'emergency',
    name: 'Emergency Only',
    icon: '🚨',
    allowedApps: [
      COMMON_PACKAGES.PHONE,
      COMMON_PACKAGES.PHONE_ALT,
      COMMON_PACKAGES.SMS,
      COMMON_PACKAGES.SMS_ALT,
      COMMON_PACKAGES.CONTACTS,
      COMMON_PACKAGES.CONTACTS_ALT,
    ],
    enableGrayscale: true,
    isCustom: false,
    isActive: false,
  },
  {
    id: 'work',
    name: 'Work Mode',
    icon: '💼',
    allowedApps: [
      COMMON_PACKAGES.PHONE,
      COMMON_PACKAGES.PHONE_ALT,
      COMMON_PACKAGES.SMS,
      COMMON_PACKAGES.SMS_ALT,
      COMMON_PACKAGES.EMAIL,
      COMMON_PACKAGES.CALENDAR,
      COMMON_PACKAGES.SLACK,
      COMMON_PACKAGES.TEAMS,
      COMMON_PACKAGES.ZOOM,
      COMMON_PACKAGES.NOTION,
      COMMON_PACKAGES.NOTES,
      COMMON_PACKAGES.DRIVE,
    ],
    enableGrayscale: false,
    isCustom: false,
    isActive: false,
  },
  {
    id: 'reading',
    name: 'Reading Mode',
    icon: '📚',
    allowedApps: [
      COMMON_PACKAGES.PHONE,
      COMMON_PACKAGES.PHONE_ALT,
      COMMON_PACKAGES.KINDLE,
      COMMON_PACKAGES.AUDIBLE,
      COMMON_PACKAGES.POCKET,
      COMMON_PACKAGES.MEDIUM,
      COMMON_PACKAGES.FEEDLY,
      COMMON_PACKAGES.GOODREADS,
      COMMON_PACKAGES.NOTES,
    ],
    enableGrayscale: true,
    isCustom: false,
    isActive: false,
  },
  {
    id: 'sleep',
    name: 'Sleep Mode',
    icon: '😴',
    allowedApps: [
      COMMON_PACKAGES.CLOCK,
      COMMON_PACKAGES.CLOCK_ALT,
      COMMON_PACKAGES.ALARM,
      COMMON_PACKAGES.PHONE,
      COMMON_PACKAGES.PHONE_ALT,
    ],
    enableGrayscale: true,
    isCustom: false,
    isActive: false,
  },
];

// Helper to get focus mode by ID
export function getFocusModeById(id: string): FocusModeConfig | undefined {
  return PRESET_FOCUS_MODES.find(mode => mode.id === id);
}

// Helper to create custom focus mode template
export function createCustomFocusMode(
  name: string,
  allowedApps: string[],
): FocusModeConfig {
  return {
    id: `custom-${Date.now()}`,
    name,
    icon: '⚙️',
    allowedApps,
    enableGrayscale: false,
    isCustom: true,
    isActive: false,
  };
}
