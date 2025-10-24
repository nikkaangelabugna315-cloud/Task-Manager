import { useState } from 'react'
import './App.css'


function App() {
  const initialUsers = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      tasks: ["Fix navbar bug", "Update login page", "Review UI layout"],
    },
    {
      name: "Maria Santos",
      role: "Backend Developer",
      tasks: ["Optimize API", "Add user authentication", "Database cleanup"],
    },
    {
      name: "Alex Cruz",
      role: "Project Manager",
      tasks: ["Check team progress", "Prepare weekly report", "Client meeting"],
    },
  ];

  // users state so we can add/delete tasks
  const [users, setUsers] = useState(initialUsers)

  // per-user new task inputs
  const [inputs, setInputs] = useState<string[]>(() => initialUsers.map(() => ''))

  const handleInputChange = (userIndex: number, value: string) => {
    setInputs(prev => {
      const copy = [...prev]
      copy[userIndex] = value
      return copy
    })
  }

  const handleAddTask = (userIndex: number) => {
    const text = inputs[userIndex]?.trim()
    if (!text) return

    setUsers(prev => {
      const copy = prev.map(u => ({ ...u, tasks: [...u.tasks] }))
      copy[userIndex].tasks.push(text)
      return copy
    })

    // clear the input for that user
    setInputs(prev => {
      const copy = [...prev]
      copy[userIndex] = ''
      return copy
    })
  }

  const handleDeleteTask = (userIndex: number, taskIndex: number) => {
    setUsers(prev => {
      const copy = prev.map(u => ({ ...u, tasks: [...u.tasks] }))
      copy[userIndex].tasks.splice(taskIndex, 1)
      return copy
    })
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <h1>Task Manager Dashboard</h1>
        <p className="subtitle">Monitor and manage your team’s workflow</p>
      </header>

      {/* Main Content */}
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

            <ul className="task-list">
              {user.tasks.map((task, i) => (
                <li key={`${index}-${i}`} className="task-item">
                  <span className="dot"></span>
                  <span className="task-text">{task}</span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(index, i)}
                    aria-label={`Delete task ${task}`}
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
                onKeyDown={e => { if (e.key === 'Enter') handleAddTask(index) }}
              />
              <button className="add-btn" onClick={() => handleAddTask(index)}>+ Add Task</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App