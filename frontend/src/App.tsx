import { useState } from 'react';
import './App.css';

function App() {
  const initialUsers = [
    {
      name: "Nikka Angela Bugna",
      role: "Frontend Developer",
      tasks: [
        { text: "Fix navbar bug", completed: false },
        { text: "Update login page", completed: false },
        { text: "Review UI layout", completed: false },
      ],
    },
    {
      name: "Emelyn Alegre",
      role: "Backend Developer",
      tasks: [
        { text: "Optimize API", completed: false },
        { text: "Add user authentication", completed: false },
        { text: "Database cleanup", completed: false },
      ],
    },
    {
      name: "Jovsky Reyes",
      role: "Project Manager",
      tasks: [
        { text: "Check team progress", completed: false },
        { text: "Prepare weekly report", completed: false },
        { text: "Client meeting", completed: false },
      ],
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [inputs, setInputs] = useState<string[]>(() => initialUsers.map(() => ''));

  const handleInputChange = (userIndex: number, value: string) => {
    setInputs(prev => {
      const copy = [...prev];
      copy[userIndex] = value;
      return copy;
    });
  };

  const handleAddTask = (userIndex: number) => {
    const text = inputs[userIndex]?.trim();
    if (!text) return;

    setUsers(prev => {
      const copy = prev.map(u => ({ ...u, tasks: [...u.tasks] }));
      copy[userIndex].tasks.push({ text, completed: false });
      return copy;
    });

    setInputs(prev => {
      const copy = [...prev];
      copy[userIndex] = '';
      return copy;
    });
  };

  const confirmDeleteTask = (userIndex: number, taskIndex: number) => {
    const task = users[userIndex].tasks[taskIndex].text;
    if (window.confirm(`Are you sure you want to delete "${task}"?`)) {
      handleDeleteTask(userIndex, taskIndex);
    }
  };

  const handleDeleteTask = (userIndex: number, taskIndex: number) => {
    setUsers(prev => {
      const copy = prev.map(u => ({ ...u, tasks: [...u.tasks] }));
      copy[userIndex].tasks.splice(taskIndex, 1);
      return copy;
    });
  };

  const toggleTaskCompletion = (userIndex: number, taskIndex: number) => {
    setUsers(prev => {
      const copy = prev.map(u => ({ ...u, tasks: [...u.tasks] }));
      copy[userIndex].tasks[taskIndex].completed = !copy[userIndex].tasks[taskIndex].completed;
      return copy;
    });
  };

  const getUserProgress = (user: { tasks: { text: string; completed: boolean }[] }) => {
    const total = user.tasks.length;
    const completed = user.tasks.filter(t => t.completed).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Task Manager Dashboard</h1>
        <p className="subtitle">Monitor and manage your team’s workflow</p>
      </header>

      <main className="main-content">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-header">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
                alt={user.name}
                className="avatar"
              />
              <div>
                <h2>{user.name}</h2>
                <p className="role">{user.role}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${getUserProgress(user)}%` }}
              ></div>
            </div>
            <p className="progress-text">{getUserProgress(user)}% completed</p>

            <ul className="task-list">
              {user.tasks.map((task, i) => (
                <li
                  key={`${index}-${i}`}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index, i)}
                  />
                  <span className="task-text">{task.text}</span>
                  <button
                    className="delete-btn"
                    onClick={() => confirmDeleteTask(index, i)}
                    aria-label={`Delete task ${task.text}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <div className="add-task-row">
              <input
                type="text"
                placeholder="New task"
                value={inputs[index] ?? ''}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddTask(index); }}
              />
              <button className="add-btn" onClick={() => handleAddTask(index)}>+ Add Task</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
