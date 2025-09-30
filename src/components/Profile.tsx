import React, { useState } from 'react';
import { CreditCard as Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { getStats } = useTasks();
  const stats = getStats();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  const handleSave = () => {
    if (editData.name.trim() && editData.email.trim()) {
      updateProfile(editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
    });
    setIsEditing(false);
  };

  if (!user) return null;

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="relative group">
            <img
              src={editData.avatar}
              alt={editData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit2 className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    value={editData.avatar}
                    onChange={(e) => setEditData((prev) => ({ ...prev, avatar: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600 text-lg mt-1">{user.email}</p>
                <p className="text-sm text-gray-500 mt-2">Member since {user.joinDate}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-gray-700 font-medium">Total Tasks</span>
                <span className="font-bold text-xl text-blue-600">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-100">
                <span className="text-gray-700 font-medium">Completed Tasks</span>
                <span className="font-bold text-xl text-green-600">{stats.completed}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <span className="text-gray-700 font-medium">Active Tasks</span>
                <span className="font-bold text-xl text-yellow-600">{stats.active}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                <span className="text-gray-700 font-medium">Completion Rate</span>
                <span className="font-bold text-xl text-cyan-600">{completionRate}%</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Achievements</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg text-white shadow-md">
                <h4 className="font-semibold text-lg mb-1">Task Master</h4>
                <p className="text-sm opacity-90">Completed {stats.completed} tasks</p>
              </div>
              {stats.total >= 10 && (
                <div className="p-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg text-white shadow-md">
                  <h4 className="font-semibold text-lg mb-1">Productive Pro</h4>
                  <p className="text-sm opacity-90">Created 10+ tasks</p>
                </div>
              )}
              {completionRate >= 50 && (
                <div className="p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg text-white shadow-md">
                  <h4 className="font-semibold text-lg mb-1">Half Way There</h4>
                  <p className="text-sm opacity-90">50% completion rate achieved</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
