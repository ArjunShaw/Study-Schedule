import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://study-os-backend.onrender.com/api/auth/register",
        { username, email, password }
      );

      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="center">
      <h2>Register</h2>

      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}