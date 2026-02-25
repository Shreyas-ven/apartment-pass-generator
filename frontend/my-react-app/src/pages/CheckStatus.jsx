import { useState } from "react";
import { checkStatus } from "../services/api";
import "./CheckStatus.css";

export default function CheckStatus() {
  const [key, setKey] = useState("");
  const [data, setData] = useState(null);

  const search = async () => {
    if (!key) {
      alert("Enter pass key");
      return;
    }

    const res = await checkStatus(key);
    setData(res);
  };

  return (
    <div
      className="status-page"
      style={{ backgroundImage: "url(/3d.webp)" }}   // ✅ WORKING METHOD
    >
      <div className="status-overlay"></div>

      <div className="status-card">
        <h2>Check Visitor Status</h2>

        <input
          placeholder="Enter Pass Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <button onClick={search}>Check</button>

        {data && (
          <div className="result-box">
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Room:</strong> {data.room}</p>
            <p><strong>Status:</strong> {data.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}