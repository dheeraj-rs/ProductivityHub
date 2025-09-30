import React from 'react';
import { CheckSquare, TrendingUp, Clock, Calendar, Bell, AlertTriangle } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { allTasks, getStats } = useTasks();
  const stats = getStats();

  const recentTasks = allTasks.slice(0, 5);

  const notifications = [
    `You have ${stats.high} high priority tasks`,
    stats.overdue > 0 ? `${stats.overdue} tasks are overdue` : 'All tasks are on track',
    `${stats.completed} tasks completed this session`,
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your work today.</p>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
              <p className="text-4xl font-bold mt-2">{stats.total}</p>
            </div>
            <CheckSquare className="w-12 h-12 text-blue-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Completed</p>
              <p className="text-4xl font-bold mt-2">{stats.completed}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">High Priority</p>
              <p className="text-4xl font-bold mt-2">{stats.high}</p>
            </div>
            <Clock className="w-12 h-12 text-orange-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Overdue</p>
              <p className="text-4xl font-bold mt-2">{stats.overdue}</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-200 opacity-80" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-700" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium truncate ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{task.description}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {task.createdAt.toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No tasks yet. Create your first task to get started!</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-700" />
          Notifications
        </h2>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:bg-blue-100 transition-colors"
            >
              <p className="text-sm text-gray-800">{notification}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
