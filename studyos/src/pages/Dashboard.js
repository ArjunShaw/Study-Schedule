import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Stats from "../components/Stats";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import Charts from "../components/Charts";
import AIBox from "../components/AIBox";
import "../styles/style.css";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [chartsVisible, setChartsVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // 🔥 new

  // 🔐 PROTECT ROUTE
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // LOAD DATA
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedXp = parseInt(localStorage.getItem("xp")) || 0;
    const savedStreak = parseInt(localStorage.getItem("streak")) || 0;

    setTasks(savedTasks);
    setXp(savedXp);
    setStreak(savedStreak);
  }, []);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("xp", xp);
    localStorage.setItem("streak", streak);
  }, [tasks, xp, streak]);

  // 🔓 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="container">

      {/* 🔥 HEADER WITH PROFILE */}
      <div className="header">
        <h1>Study OS</h1>

        <div className="profile">
          <div
            className="profile-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            👤 {localStorage.getItem("userEmail") || "User"}
          </div>

          {showMenu && (
            <div className="dropdown">
              <p>{localStorage.getItem("userEmail")}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* STATS */}
      <Stats tasks={tasks} xp={xp} streak={streak} />

      {/* INPUT */}
      <TaskInput tasks={tasks} setTasks={setTasks} />

      {/* LIST */}
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        xp={xp}
        setXp={setXp}
        streak={streak}
        setStreak={setStreak}
      />

      {/* CHART BUTTON */}
      <button onClick={() => setChartsVisible(!chartsVisible)}>
        📊 Show Charts
      </button>

      {chartsVisible && <Charts tasks={tasks} />}

      {/* AI */}
      <AIBox tasks={tasks} />
    </div>
  );
}

export default Dashboard;