export default function TaskList({ tasks, setTasks, xp, setXp, streak, setStreak }) {

  const completeTask = (i) => {
    const updated = [...tasks];
    if (!updated[i].completed) {
      updated[i].completed = true;
      setXp(xp + updated[i].hours * 10);
      setStreak(streak + 1);
    }
    setTasks(updated);
  };

  const deleteTask = (i) => {
    const updated = tasks.filter((_, index) => index !== i);
    setTasks(updated);
  };

  return (
    <ul>
      {tasks.map((t, i) => (
        <li key={i} className={t.completed ? "done" : ""}>
          {t.name} - {t.hours}h
          <div>
            <button onClick={() => completeTask(i)}>✔</button>
            <button onClick={() => deleteTask(i)}>❌</button>
          </div>
        </li>
      ))}
    </ul>
  );
}