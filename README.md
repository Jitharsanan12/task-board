# Task Priority Board

A small React app for organizing tasks into priority levels: Unassigned, High, Medium and Low.

Built by Jitharsanan.

## How to run

1. Install dependencies:
   npm install
2. Start the app:
   npm run dev
3. Open the link shown in the terminal (usually http://localhost:5173).

## Features

- All tasks start in the Unassigned section.
- Move a task with the High, Medium or Low buttons. Each task only shows buttons for the sections it is not already in.
- Drag and drop a task into any section.
- Send a task back with the Unassign button (shown only on assigned tasks).
- Each section shows how many tasks it has.

## How it works

- **One data source:** all tasks are stored in a single array in `src/data/tasks.js`. Each task has a `priority` field that says which section it belongs to.
- **State:** `App` keeps the task array in React state with `useState`. Because all sections share the same data, the state lives in `App` (their common parent) and is passed down as props.
- **Displaying tasks:** `App` loops over the four sections and renders a `Section` component for each one, passing it only the tasks with that priority using `filter()`. Each `Section` renders a `TaskCard` for every task.
- **Moving tasks:** `moveTask()` in `App` uses the functional updater `setTasks(prev => prev.map(...))` to create a new array where only the chosen task's priority changes. `Section` and `TaskCard` receive it as the `onMoveTask` prop.
- **Unassigning:** `unassignTask()` calls `moveTask()` with the priority `"unassigned"`.
- **Drag and drop:** `TaskCard` stores the task id in `onDragStart`. `Section` uses `onDragOver` to allow dropping and highlight itself, `onDragLeave` to remove the highlight, and `onDrop` to read the id and call `onMoveTask`, the same function the buttons use.

## Project structure

src/
  main.jsx                 Entry point that renders App
  index.css                Global page styles
  App.jsx                  Holds the task state and the move/unassign logic
  App.css                  Board, section and task styles
  components/Section.jsx   One priority column; handles dropping tasks
  components/TaskCard.jsx  One task with its buttons; handles dragging
  data/tasks.js            Initial tasks and the list of sections