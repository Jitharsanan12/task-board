const PRIORITY_BUTTONS = [
  { priority: "high", label: "High" },
  { priority: "medium", label: "Medium" },
  { priority: "low", label: "Low" },
];

export default function TaskCard({ task, onMoveTask, onUnassignTask }) {
  // When you start dragging this task, store its id so the section can read it on drop
  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", task.id);
  }

  return (
    <li className="task" draggable onDragStart={handleDragStart}>
      <span className="task-title">{task.title}</span>

      {/* Only show buttons for priorities the task does NOT already have */}
      {PRIORITY_BUTTONS.filter((button) => button.priority !== task.priority).map(
        (button) => (
          <button
            key={button.priority}
            type="button"
            onClick={() => onMoveTask(task.id, button.priority)}
          >
            {button.label}
          </button>
        )
      )}

      {/* Only assigned tasks can be unassigned */}
      {task.priority !== "unassigned" && (
        <button type="button" onClick={() => onUnassignTask(task.id)}>
          Unassign
        </button>
      )}
    </li>
  );
}