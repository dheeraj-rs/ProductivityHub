import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  CheckSquare,
  Search,
  Filter,
  Calendar,
  X,
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useSettings } from '../hooks/useSettings';

export const TaskList: React.FC = () => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
    sort,
    setSort,
    searchQuery,
    setSearchQuery,
    isLoading,
  } = useTasks();

  const { settings } = useSettings();

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: settings.defaultPriority,
    dueDate: '',
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    addTask({
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : null,
    });

    setNewTask({
      title: '',
      description: '',
      priority: settings.defaultPriority,
      dueDate: '',
    });
    setShowNewTaskForm(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={() => setShowNewTaskForm(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>

      {showNewTaskForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Create New Task</h2>
            <button
              onClick={() => setShowNewTaskForm(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task description..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, priority: e.target.value as any }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddTask}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg transition-all font-medium"
              >
                Create Task
              </button>
              <button
                onClick={() => setShowNewTaskForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md ${
              task.completed ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-1 ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                }`}
              >
                {task.completed && <CheckSquare className="w-4 h-4" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2 flex-wrap">
                  <h3
                    className={`text-lg font-semibold ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full border font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
                <p
                  className={`text-gray-600 mb-3 ${task.completed ? 'line-through' : ''}`}
                >
                  {task.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Created: {task.createdAt.toLocaleDateString()}</span>
                  {task.dueDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {task.dueDate.toLocaleDateString()}
                      {task.dueDate < new Date() && !task.completed && (
                        <span className="text-red-600 font-medium ml-1">(Overdue)</span>
                      )}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 p-2 transition-colors hover:bg-red-50 rounded-lg flex-shrink-0"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <CheckSquare className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">
            {searchQuery || filter !== 'all' ? 'No tasks found' : 'No tasks yet'}
          </h3>
          <p className="text-gray-400">
            {searchQuery || filter !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Create your first task to get started!'}
          </p>
        </div>
      )}
    </div>
  );
};
