export default function AIBox({ tasks }) {
  let text = "Start adding tasks";

  const high = tasks.filter((t) => t.priority === "High" && !t.completed).length;

  if (high > 0) text = "Focus on HIGH priority tasks!";
  else if (tasks.length > 0) text = "Great progress 🚀";

  return (
    <div className="ai-box">
      <h3>AI Suggestion</h3>
      <p>{text}</p>
    </div>
  );
}