import { useState, useEffect } from 'react';
import { Task, FilterType, SortType } from '../types';
import { useAuth } from '../context/AuthContext';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = () => {
    setIsLoading(true);
    try {
      const storageKey = `tasks_${user?.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedTasks = JSON.parse(stored).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
        }));
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = (updatedTasks: Task[]) => {
    if (user) {
      const storageKey = `tasks_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedTasks = [newTask, ...tasks];
    saveTasks(updatedTasks);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
  };

  const toggleTask = (id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    return sorted;
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const high = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    const overdue = tasks.filter(
      t => t.dueDate && t.dueDate < new Date() && !t.completed
    ).length;

    return { total, completed, active, high, overdue };
  };

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    filter,
    setFilter,
    sort,
    setSort,
    searchQuery,
    setSearchQuery,
    getStats,
    isLoading,
  };
};
