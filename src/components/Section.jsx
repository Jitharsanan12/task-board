import { useState } from "react";
import TaskCard from "./TaskCard";

export default function Section({ title, priority, tasks, onMoveTask, onUnassignTask }) {
  // Only this section needs to know if something is being dragged over it
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(event) {
    event.preventDefault(); // allows dropping here
    setIsDragOver(true);
  }

  function handleDragLeave(event) {
    // Only remove the highlight if the mouse really left the section,
    // not just moved onto a task inside it
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragOver(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragOver(false);
    const taskId = Number(event.dataTransfer.getData("text/plain"));
    onMoveTask(taskId, priority);
  }

  let className = `section section-${priority}`;
  if (isDragOver) {
    className += " section-drag-over";
  }

  return (
    <section
      className={className}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-labelledby={`${priority}-heading`}
    >
      <h2 id={`${priority}-heading`}>
        {title} ({tasks.length})
      </h2>

      {tasks.length === 0 && <p className="empty">No tasks here yet.</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onUnassignTask={onUnassignTask}
          />
        ))}
      </ul>
    </section>
  );
}