import { useState, useEffect } from 'react';
import { Settings } from '../types';
import { useAuth } from '../context/AuthContext';

const defaultSettings: Settings = {
  emailNotifications: true,
  desktopNotifications: true,
  weeklyReports: false,
  defaultPriority: 'medium',
  tasksPerPage: 20,
};

export const useSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = () => {
    setIsLoading(true);
    try {
      const storageKey = `settings_${user?.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = (updates: Partial<Settings>) => {
    if (user) {
      const updatedSettings = { ...settings, ...updates };
      setSettings(updatedSettings);
      const storageKey = `settings_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedSettings));
    }
  };

  return {
    settings,
    updateSettings,
    isLoading,
  };
};
