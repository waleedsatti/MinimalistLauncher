export interface App {
  packageName: string;
  appName: string;
}

export interface AppUsage {
  [key: string]: number; // packageName: totalOpens
}

export interface DailyIntention {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  status: 'in_progress' | 'complete' | 'partial' | 'missed';
  createdAt: string; // ISO timestamp
  completedAt: string | null;
}

export interface FocusModeConfig {
  id: string;
  name: string;
  icon: string;
  allowedApps: string[]; // package names
  enableGrayscale: boolean;
  isCustom: boolean;
  isActive: boolean;
}

export interface BlockRule {
  id: string;
  packageName: string;
  type: 'timed' | 'dailyLimit' | 'openLimit';
  startTime?: string; // ISO timestamp
  endTime?: string; // ISO timestamp
  daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  dailyLimitMinutes?: number;
  usedTodayMinutes?: number;
  maxOpensPerDay?: number;
  opensToday?: number;
  resetDate?: string; // YYYY-MM-DD
  isActive: boolean;
}

export interface PartnerConfig {
  partnerId: string;
  partnerName: string;
  connectionCode: string;
  connectedAt: string; // ISO timestamp
  sharingEnabled: boolean;
  lastSyncedAt: string; // ISO timestamp
}

export interface PartnerProgress {
  date: string; // YYYY-MM-DD
  phoneFreeMinutes: number;
  socialMediaFreeMinutes: number;
  currentIntention: string;
  intentionStatus: 'in_progress' | 'complete' | 'partial' | 'missed';
  streakDays: number;
}

export interface AppSettings {
  grayscaleEnabled: boolean;
  notificationsEnabled: boolean;
  eveningCheckInTime: string; // HH:MM format
  morningPromptTime: string; // HH:MM format
  breakGlassPhrase: string;
  vibrationEnabled: boolean;
}
