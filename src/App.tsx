import React, { useState } from 'react';
import { Home, CheckSquare, User, Settings } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { TaskList } from './components/TaskList';
import { Profile } from './components/Profile';
import { Settings as SettingsPage } from './components/Settings';
import { View } from './types';

const MainApp: React.FC = () => {
  const { user, isAuthenticated, login, signup, isLoading, error } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const navigation = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: Home },
    { id: 'tasks' as View, label: 'Tasks', icon: CheckSquare },
    { id: 'profile' as View, label: 'Profile', icon: User },
    { id: 'settings' as View, label: 'Settings', icon: Settings },
  ];

  if (!isAuthenticated) {
    return (
      <AuthForm
        mode={authMode}
        onSubmit={async (data) => {
          if (authMode === 'signup' && data.name) {
            await signup(data.name, data.email, data.password);
          } else {
            await login(data.email, data.password);
          }
        }}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        error={error}
        isLoading={isLoading}
      />
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskList />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ProductivityHub
              </span>
            </div>

            <div className="flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setCurrentView('profile')}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">{renderCurrentView()}</div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
