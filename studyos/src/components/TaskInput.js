import { useState } from "react";

export default function TaskInput({ tasks, setTasks }) {
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [priority, setPriority] = useState("Low");

  const addTask = () => {
    if (!name || !hours) return;

    setTasks([
      ...tasks,
      { name, hours: parseFloat(hours), priority, completed: false },
    ]);

    setName("");
    setHours("");
  };

  return (
    <div className="task-input">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Task" />
      <input value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Hours" />
      <select onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button onClick={addTask}>Add</button>
    </div>
  );
}