export default function Stats({ tasks, xp, streak }) {
  const totalHours = tasks
    .filter((t) => t.completed)
    .reduce((acc, t) => acc + t.hours, 0);

  return (
    <div className="stats">
      <div className="card">XP: {xp}</div>
      <div className="card">Level: {Math.floor(xp / 100) + 1}</div>
      <div className="card">Streak: {streak}</div>
      <div className="card">Hours: {totalHours}</div>
    </div>
  );
}