import React from 'react';
import { Bell, Sliders, User as UserIcon, LogOut } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../context/AuthContext';

export const Settings: React.FC = () => {
  const { settings, updateSettings, isLoading } = useSettings();
  const { logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <div className="grid gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-700" />
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  updateSettings({ emailNotifications: e.target.checked })
                }
                className="w-5 h-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="font-medium text-gray-900">Email notifications</span>
                <p className="text-sm text-gray-600">
                  Receive email updates for new tasks and reminders
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={settings.desktopNotifications}
                onChange={(e) =>
                  updateSettings({ desktopNotifications: e.target.checked })
                }
                className="w-5 h-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="font-medium text-gray-900">Desktop notifications</span>
                <p className="text-sm text-gray-600">
                  Show browser notifications for important updates
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={(e) => updateSettings({ weeklyReports: e.target.checked })}
                className="w-5 h-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="font-medium text-gray-900">Weekly progress reports</span>
                <p className="text-sm text-gray-600">
                  Get a summary of your productivity every week
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-gray-700" />
            Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Task Priority
              </label>
              <select
                value={settings.defaultPriority}
                onChange={(e) =>
                  updateSettings({ defaultPriority: e.target.value as any })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">
                New tasks will default to this priority level
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tasks Per Page
              </label>
              <select
                value={settings.tasksPerPage}
                onChange={(e) =>
                  updateSettings({ tasksPerPage: parseInt(e.target.value) })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">
                Number of tasks to display per page
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-gray-700" />
            Account
          </h2>
          <div className="space-y-3">
            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
            <p className="text-sm text-gray-600 text-center">
              You will be redirected to the login page
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-700 mb-4">
            Check out our documentation or contact support for assistance with any issues.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
