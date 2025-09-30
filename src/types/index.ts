export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
}

export interface Settings {
  emailNotifications: boolean;
  desktopNotifications: boolean;
  weeklyReports: boolean;
  defaultPriority: 'low' | 'medium' | 'high';
  tasksPerPage: number;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export type View = 'dashboard' | 'tasks' | 'profile' | 'settings';

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'date' | 'priority' | 'title';
