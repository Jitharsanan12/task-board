import { useState } from "react";
import Section from "./components/Section";
import { initialTasks, SECTIONS } from "./data/tasks";
import "./App.css";

export default function App() {
  // One list holds every task. This is the single source of truth.
  const [tasks, setTasks] = useState(initialTasks);

  // Requirement 3: move a task to a new priority
  function moveTask(taskId, newPriority) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, priority: newPriority };
        }
        return task;
      })
    );
  }

  // Requirement 4: send a task back to Unassigned
  function unassignTask(taskId) {
    moveTask(taskId, "unassigned");
  }

  return (
    <div className="board">
      <h1>Task priority board</h1>
      <p className="hint">Drag a task into a section, or use the buttons.</p>

      <div className="sections">
        {SECTIONS.map((section) => (
          <Section
            key={section.priority}
            title={section.title}
            priority={section.priority}
            tasks={tasks.filter((task) => task.priority === section.priority)}
            onMoveTask={moveTask}
            onUnassignTask={unassignTask}
          />
        ))}
      </div>
    </div>
  );
}