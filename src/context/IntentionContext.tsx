import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {DailyIntention} from '../types/app.types';
import {StorageService} from '../services/StorageService';

interface IntentionContextType {
  currentIntention: DailyIntention | null;
  intentionHistory: DailyIntention[];
  streak: number;
  loading: boolean;
  setTodayIntention: (text: string) => Promise<void>;
  completeIntention: (
    status: 'complete' | 'partial' | 'missed',
  ) => Promise<void>;
  loadHistory: () => Promise<void>;
  getTodayIntention: () => DailyIntention | null;
}

const IntentionContext = createContext<IntentionContextType | undefined>(
  undefined,
);

export function IntentionProvider({children}: {children: ReactNode}) {
  const [currentIntention, setCurrentIntention] =
    useState<DailyIntention | null>(null);
  const [intentionHistory, setIntentionHistory] = useState<DailyIntention[]>(
    [],
  );
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const intentions = await StorageService.getIntentions();
      setIntentionHistory(intentions);

      // Find today's intention
      const today = getTodayDateString();
      const todayIntention = intentions.find(i => i.date === today);
      setCurrentIntention(todayIntention || null);

      // Calculate streak
      const calculatedStreak = calculateStreak(intentions);
      setStreak(calculatedStreak);
    } catch (error) {
      console.error('Error loading intentions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTodayDateString = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const setTodayIntention = async (text: string) => {
    const today = getTodayDateString();
    const newIntention: DailyIntention = {
      id: `intention-${Date.now()}`,
      date: today,
      text,
      status: 'in_progress',
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    const updatedHistory = [
      ...intentionHistory.filter(i => i.date !== today),
      newIntention,
    ];

    await StorageService.setIntentions(updatedHistory);
    setIntentionHistory(updatedHistory);
    setCurrentIntention(newIntention);
  };

  const completeIntention = async (
    status: 'complete' | 'partial' | 'missed',
  ) => {
    if (!currentIntention) return;

    const updatedIntention: DailyIntention = {
      ...currentIntention,
      status,
      completedAt: new Date().toISOString(),
    };

    const updatedHistory = intentionHistory.map(i =>
      i.id === currentIntention.id ? updatedIntention : i,
    );

    await StorageService.setIntentions(updatedHistory);
    setIntentionHistory(updatedHistory);
    setCurrentIntention(updatedIntention);

    // Recalculate streak
    const newStreak = calculateStreak(updatedHistory);
    setStreak(newStreak);
  };

  const calculateStreak = (intentions: DailyIntention[]): number => {
    if (intentions.length === 0) return 0;

    // Sort by date descending
    const sorted = [...intentions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    let streakCount = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const intention of sorted) {
      const intentionDate = new Date(intention.date);
      intentionDate.setHours(0, 0, 0, 0);

      // Check if intention is for current streak date
      if (intentionDate.getTime() === currentDate.getTime()) {
        if (intention.status === 'complete') {
          streakCount++;
          // Move to previous day
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          // Streak broken
          break;
        }
      } else if (intentionDate.getTime() < currentDate.getTime()) {
        // Gap in dates, streak broken
        break;
      }
    }

    return streakCount;
  };

  const loadHistory = async () => {
    await loadData();
  };

  const getTodayIntention = (): DailyIntention | null => {
    return currentIntention;
  };

  return (
    <IntentionContext.Provider
      value={{
        currentIntention,
        intentionHistory,
        streak,
        loading,
        setTodayIntention,
        completeIntention,
        loadHistory,
        getTodayIntention,
      }}>
      {children}
    </IntentionContext.Provider>
  );
}

export function useIntention() {
  const context = useContext(IntentionContext);
  if (context === undefined) {
    throw new Error('useIntention must be used within IntentionProvider');
  }
  return context;
}
